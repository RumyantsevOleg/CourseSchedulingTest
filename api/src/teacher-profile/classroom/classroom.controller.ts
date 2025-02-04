import { Controller, Get, Post, Body, Param, ParseUUIDPipe } from '@nestjs/common'
import { ClassroomService } from './classroom.service'
import { ClassroomDto } from './classroom.dto'

@Controller('teacher-profiles/:teacherId/classrooms')
export class ClassroomController {
  constructor(private readonly classroomService: ClassroomService) {}

  @Post()
  create(@Body() createClassroomDto: ClassroomDto) {
    return this.classroomService.create(createClassroomDto)
  }

  @Get()
  findMany(@Param('teacherId', new ParseUUIDPipe()) teacherId: string) {
    return this.classroomService.findMany(teacherId)
  }
}
