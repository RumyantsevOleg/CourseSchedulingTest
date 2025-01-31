import { Injectable } from '@nestjs/common'
import { TeacherProfileDto } from './teacher-profile.dto'

@Injectable()
export class TeacherProfileService {
  create(createTeacherDto: TeacherProfileDto) {
    return 'This action adds a new teacher-profile'
  }

  findAll() {
    return `This action returns all teacher`
  }

  findOne(id: number) {
    return `This action returns a #${id} teacher`
  }

  update(id: number, updateTeacherDto) {
    return `This action updates a #${id} teacher`
  }

  remove(id: number) {
    return `This action removes a #${id} teacher`
  }
}
