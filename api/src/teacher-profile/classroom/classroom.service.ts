import { Injectable } from '@nestjs/common'
import { ClassroomDto } from './classroom.dto'

@Injectable()
export class ClassroomService {
  create(createClassroomDto: ClassroomDto) {
    return 'This action adds a new classroom'
  }

  findAll() {
    return `This action returns all classroom`
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
