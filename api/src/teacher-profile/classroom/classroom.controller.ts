import { Controller, Get, Post, Body, Param, ParseUUIDPipe, UseGuards } from '@nestjs/common'
import { ClassroomService } from './classroom.service'
import { ClassroomDto } from './classroom.dto'
import { TeacherProfileGuard } from '../teacher-profile.guard'

@UseGuards(TeacherProfileGuard)
@Controller('teacher-profiles/:teacherProfileId/classrooms')
export class ClassroomController {
  constructor(private readonly classroomService: ClassroomService) {}

  @Post()
  create(@Body() createClassroomDto: ClassroomDto) {
    return this.classroomService.create(createClassroomDto)
  }

  @Get()
  findMany(@Param('teacherProfileId', new ParseUUIDPipe()) teacherProfileId: string) {
    return this.classroomService.findMany(teacherProfileId)
  }
}
