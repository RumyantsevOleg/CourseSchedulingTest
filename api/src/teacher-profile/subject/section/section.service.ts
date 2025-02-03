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

    // Todo we can validate teacherId,classroomId and subjectId existing. And overlap check
    return this.prismaService.section.create({
      data: {
        ...creationPayload,
        teacherId,
        subjectId,
        SectionSchedule: {
          // Todo
          createMany: {
            data: schedule,
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
