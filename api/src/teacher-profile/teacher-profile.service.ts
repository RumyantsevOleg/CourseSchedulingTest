import { Injectable } from '@nestjs/common'
import { TeacherProfileDto } from './teacher-profile.dto'

@Injectable()
export class TeacherProfileService {
  findOne(id: number) {
    return `This action returns a #${id} teacher`
  }
}
