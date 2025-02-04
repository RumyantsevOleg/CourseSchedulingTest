import { Injectable } from '@nestjs/common'
import { SubjectDto } from './subject.dto'
import { PrismaService } from '../../common/prisma/prisma.service'

@Injectable()
export class SubjectService {
  constructor(private readonly prismaService: PrismaService) {}

  public findAll(teacherProfileId: string) {
    return this.prismaService.subject.findMany({
      where: {
        teacherProfileId,
      },
    })
  }
}
