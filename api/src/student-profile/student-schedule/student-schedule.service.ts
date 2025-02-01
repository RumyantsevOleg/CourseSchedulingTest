import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateScheduleDto } from './student-schedule.dto'
import { PrismaService } from '../../common/prisma/prisma.service'
import { Interval } from 'luxon'

@Injectable()
export class StudentScheduleService {
  constructor(private readonly prismaService: PrismaService) {}

  public async create(createScheduleDto: CreateScheduleDto, studentId: string) {
    const section = await this.prismaService.section.findUnique({
      where: {
        id: createScheduleDto.sectionId,
      },
    })
    if (!section) {
      throw new NotFoundException(`No section found with id ${createScheduleDto.sectionId}`)
    }

    return this.prismaService.sectionSubscription.create({
      data: {
        studentId,
        sectionId: createScheduleDto.sectionId,
      },
    })
  }

  public async findMany(studentId: string) {
    return this.prismaService.sectionSubscription.findMany({
      where: {
        studentId,
      },
      include: {
        Section: true,
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
