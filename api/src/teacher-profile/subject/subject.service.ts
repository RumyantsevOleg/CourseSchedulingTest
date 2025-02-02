import { Injectable } from '@nestjs/common'
import { SubjectDto } from './subject.dto'
import { PrismaService } from '../../common/prisma/prisma.service'

@Injectable()
export class SubjectService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createSubjectDto: SubjectDto) {
    return 'This action adds a new subject'
  }

  public findAll(teacherProfileId: string) {
    return this.prismaService.subject.findMany({
      where: {
        teacherProfileId,
      },
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} subject`
  }

  update(id: number, updateSubjectDto) {
    return `This action updates a #${id} subject`
  }

  remove(id: number) {
    return `This action removes a #${id} subject`
  }
}
