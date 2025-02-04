import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { TeacherProfileService } from './teacher-profile.service'

@Controller('teacher-profiles')
export class TeacherProfileController {
  constructor(private readonly teacherService: TeacherProfileService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teacherService.findOne(+id)
  }
}
