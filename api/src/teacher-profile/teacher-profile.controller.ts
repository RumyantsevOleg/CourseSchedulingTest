import { Controller, Get, Param } from '@nestjs/common'
import { TeacherProfileService } from './teacher-profile.service'

@Controller('teacher-profiles')
export class TeacherProfileController {
  constructor(private readonly teacherService: TeacherProfileService) {}

  @Get(':teacherProfileId')
  findOne(@Param('id') id: string) {
    return this.teacherService.findOne(+id)
  }
}
