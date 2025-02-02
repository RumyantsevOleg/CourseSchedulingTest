import { Injectable } from '@nestjs/common'
import { ClassroomDto } from './classroom.dto'
import { PrismaService } from '../../common/prisma/prisma.service'

@Injectable()
export class ClassroomService {
  constructor(private prismaService: PrismaService) {}

  create(createClassroomDto: ClassroomDto) {
    return 'This action adds a new classroom'
  }

  findMany(teacherProfileId: string) {
    return this.prismaService.classroom.findMany({
      where: {
        teacherProfileId: teacherProfileId,
      },
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} classroom`
  }

  update(id: number, updateClassroomDto) {
    return `This action updates a #${id} classroom`
  }

  remove(id: number) {
    return `This action removes a #${id} classroom`
  }
}
