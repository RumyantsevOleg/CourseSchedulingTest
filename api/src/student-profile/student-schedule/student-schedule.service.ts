import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { CreateScheduleDto } from './student-schedule.dto'
import { PrismaService } from '../../common/prisma/prisma.service'
import { Interval } from 'luxon'
import { SectionSchedule } from '@prisma/client'

@Injectable()
export class StudentScheduleService {
  constructor(private readonly prismaService: PrismaService) {}

  // Todo Add time limit for expired sections
  public async getStudentSchedules(studentId: string) {
    return this.prismaService.sectionSchedule.findMany({
      where: {
        Section: {
          SectionSubscriptions: {
            some: { studentId },
          },

          endDate: {
            gte: new Date().toISOString(),
          },
        },
      },

      include: {
        Section: {
          include: {
            Classroom: {
              select: {
                id: true,
                name: true,
              },
            },
            Subject: {
              select: {
                name: true,
              },
            },
          },
        },
      },

      orderBy: [{ day: 'asc' }, { startTime: 'asc' }],
    })
  }

  // Todo Add time limit for expired sections
  public async isConflicts(studentId: string, newSchedules: SectionSchedule[]) {
    const conflictingSchedule = await this.prismaService.sectionSchedule.findFirst({
      where: {
        Section: {
          SectionSubscriptions: {
            some: {
              studentId: studentId,
            },
          },
        },
        OR: newSchedules.map(schedule => ({
          day: schedule.day,
          OR: [
            {
              startTime: {
                gte: schedule.startTime, // Проверяем, что новое расписание начинается позже или одновременно с текущим
                lt: schedule.startTime + schedule.durationMin, // И заканчивается раньше нового расписания
              },
            },
            {
              startTime: {
                lt: schedule.startTime, // Если текущее расписание начинается до нового
              },
              endTime: {
                gte: schedule.startTime + schedule.durationMin, // И заканчивается после конца нового
              },
            },
          ],
        })),
      },
    })

    return Boolean(conflictingSchedule) // Возвращаем true, если найден конфликт
  }

  public async createSectionSubscription(createScheduleDto: CreateScheduleDto, studentId: string) {
    const section = await this.prismaService.section.findUnique({
      where: {
        id: createScheduleDto.sectionId,
      },
      include: {
        SectionSchedule: true,
      },
    })
    if (!section) {
      throw new NotFoundException(`No section found with id ${createScheduleDto.sectionId}`)
    }

    const isConflict = await this.isConflicts(studentId, section.SectionSchedule)
    if (isConflict) {
      throw new ConflictException('Time overlap conflict found')
    }

    return this.prismaService.sectionSubscription.create({
      data: {
        studentId,
        sectionId: createScheduleDto.sectionId,
      },
    })
  }

  public async delete(scheduleId: string, studentId: string) {
    const subscription = await this.prismaService.sectionSubscription.findFirst({
      where: {
        AND: [
          {
            id: scheduleId,
          },
          {
            studentId: studentId,
          },
        ],
      },
    })
    if (!subscription) {
      throw new Error('Subscription not found')
    }

    return this.prismaService.sectionSubscription.delete({
      where: { id: subscription.id },
    })
  }
}
