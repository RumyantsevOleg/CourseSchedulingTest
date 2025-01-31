import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { TeacherProfileService } from './teacher-profile.service'
import { TeacherProfileDto } from './teacher-profile.dto'

@Controller('teacher-profile')
export class TeacherProfileController {
  constructor(private readonly teacherService: TeacherProfileService) {}

  @Post()
  create(@Body() createTeacherDto: TeacherProfileDto) {
    return this.teacherService.create(createTeacherDto)
  }

  @Get()
  findAll() {
    return this.teacherService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teacherService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeacherDto) {
    return this.teacherService.update(+id, updateTeacherDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teacherService.remove(+id)
  }
}
