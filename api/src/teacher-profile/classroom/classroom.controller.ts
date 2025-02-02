import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common'
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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.classroomService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClassroomDto) {
    return this.classroomService.update(+id, updateClassroomDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.classroomService.remove(+id)
  }
}
