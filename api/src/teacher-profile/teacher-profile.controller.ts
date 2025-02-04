import { Controller, Get, Param, UseGuards } from '@nestjs/common'
import { TeacherProfileService } from './teacher-profile.service'
import { TeacherProfileGuard } from './teacher-profile.guard'

@UseGuards(TeacherProfileGuard)
@Controller('teacher-profiles')
export class TeacherProfileController {
  constructor(private readonly teacherService: TeacherProfileService) {}

  @Get(':teacherProfileId')
  findOne(@Param('teacherProfileId') teacherProfileId: string) {
    return this.teacherService.findOne(teacherProfileId)
  }
}
