import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common'
import { SectionService } from './section.service'
import { CreateSectionDto } from './section.dto'

@Controller('teacher-profile/:teacherId/subjects/:subjectId/sections')
export class SectionController {
  constructor(private readonly sectionService: SectionService) {}

  @Post()
  create(@Body() createSectionDto: CreateSectionDto) {
    return this.sectionService.create(createSectionDto)
  }

  @Get()
  findAll() {
    return this.sectionService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sectionService.findOne(+id)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sectionService.remove(+id)
  }
}
