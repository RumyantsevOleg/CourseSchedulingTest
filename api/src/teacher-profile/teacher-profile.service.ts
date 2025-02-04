import { Injectable } from '@nestjs/common'
import { TeacherProfileDto } from './teacher-profile.dto'

@Injectable()
export class TeacherProfileService {
  findOne(id: string) {
    return `This action returns a #${id} teacher`
  }
}
