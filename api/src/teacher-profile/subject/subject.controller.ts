import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { SubjectService } from './subject.service'
import { SubjectDto } from './subject.dto'

@Controller('teacher-profiles/:teacherId/subjects')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Post()
  create(@Body() createSubjectDto: SubjectDto) {
    return this.subjectService.create(createSubjectDto)
  }

  @Get()
  findAll() {
    return this.subjectService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subjectService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubjectDto) {
    return this.subjectService.update(+id, updateSubjectDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subjectService.remove(+id)
  }
}
