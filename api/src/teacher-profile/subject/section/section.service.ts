import { Injectable } from '@nestjs/common'
import { CreateSectionDto } from './section.dto'
import { PrismaService } from '../../../common/prisma/prisma.service'
import { DateTime } from 'luxon'

@Injectable()
export class SectionService {
  constructor(private readonly prismaService: PrismaService) {}

  public create(
    createSectionDto: CreateSectionDto,
    { teacherId, subjectId }: { teacherId: string; subjectId: string },
  ) {
    const { schedule, ...creationPayload } = createSectionDto
    const scheduleNumberFormat = schedule.map(({ startTime, endTime, day }) => {
      const localStartTime = DateTime.fromFormat(`${day} ${startTime}`, 'cccc HH:mm')
      const localEndTime = DateTime.fromFormat(`${day} ${endTime}`, 'cccc HH:mm')
      console.log('localStartTime, localEndTime')
      console.log(localStartTime.toUTC(), localEndTime.toUTC())

      return {
        startTime: 1000,
        endTime: 1500,
      }
    })

    // Todo we can validate teacherId,classroomId and subjectId existing
    return this.prismaService.section.create({
      data: {
        ...creationPayload,
        teacherId,
        subjectId,
        SectionSchedule: {
          // Todo
          createMany: {
            data: [],
          },
        },
      },
    })
  }

  findAll() {
    return `This action returns all section`
  }

  findOne(id: number) {
    return `This action returns a #${id} section`
  }

  update(id: number, updateSectionDto) {
    return `This action updates a #${id} section`
  }

  remove(id: number) {
    return `This action removes a #${id} section`
  }
}
