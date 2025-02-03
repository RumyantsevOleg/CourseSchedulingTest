import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { CreateScheduleDto } from './student-schedule.dto'
import { PrismaService } from '../../common/prisma/prisma.service'
import { Interval } from 'luxon'
import { SectionSchedule } from '@prisma/client'

@Injectable()
export class StudentScheduleService {
  constructor(private readonly prismaService: PrismaService) {}

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
        Section: true,
      },

      orderBy: [{ day: 'asc' }, { startTime: 'asc' }],
    })
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

        return false
      })
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
