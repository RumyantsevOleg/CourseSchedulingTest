import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { CreateScheduleDto } from './student-schedule.dto'
import { PrismaService } from '../../common/prisma/prisma.service'
import { Interval } from 'luxon'
import { SectionSchedule } from '@prisma/client'

@Injectable()
export class StudentScheduleService {
  constructor(private readonly prismaService: PrismaService) {}

  public async getStudentSchedules(studentId: string) {
    const data = await this.prismaService.sectionSubscription.findMany({
      where: {
        studentId,
      },
      select: {
        Section: {
          select: {
            SectionSchedule: {
              select: {
                day: true,
                durationMin: true,
                startTime: true,
              },
            },
          },
        },
      },
    })

    return data.flatMap(subscription => subscription.Section.SectionSchedule)
  }

  public async isConflicts(studentId, newShedules: SectionSchedule[]) {
    const schedules = await this.getStudentSchedules(studentId)

    // Todo this can be optimized. O(n**2)
    return schedules.find(({ startTime, durationMin, day }) => {
      const endTime = startTime + durationMin

      return newShedules.find(newSchedule => {
        if (newSchedule.day === day) {
          if (newSchedule.startTime >= startTime && newSchedule.startTime <= endTime) {
            return true
          }

          const newScheduleEndTime = newSchedule.startTime + endTime
          if (newScheduleEndTime >= startTime && newScheduleEndTime <= endTime) {
            return true
          }
        }
      })

      return false
    })
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
    console.log('isConflict')
    console.log(isConflict)
    if (isConflict) {
      throw new ConflictException('Time overlap conflict')
    }

    return this.prismaService.sectionSubscription.create({
      data: {
        studentId,
        sectionId: createScheduleDto.sectionId,
      },
    })
  }

  public async findMany(studentId: string) {
    const data = await this.prismaService.sectionSubscription.findMany({
      where: {
        studentId,
      },
      select: {
        Section: {
          select: {
            SectionSchedule: {
              include: {
                Section: true,
              },
            },
          },
        },
      },
    })

    return data.flatMap(elem => elem.Section.SectionSchedule)
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
