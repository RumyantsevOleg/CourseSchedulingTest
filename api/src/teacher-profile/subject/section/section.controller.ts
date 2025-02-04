import { Controller, Get, Post, Body, Param, Delete, ParseUUIDPipe } from '@nestjs/common'
import { SectionService } from './section.service'
import { CreateSectionDto } from './section.dto'

// Todo add guard
@Controller('teacher-profile/:teacherProfileId/subjects/:subjectId/sections')
export class SectionController {
  constructor(private readonly sectionService: SectionService) {}

  @Post()
  public async create(
    @Body() createSectionDto: CreateSectionDto,
    @Param('subjectId', new ParseUUIDPipe()) subjectId: string,
    @Param('teacherProfileId', new ParseUUIDPipe()) teacherProfileId: string,
  ) {
    return this.sectionService.create(createSectionDto, { teacherId: teacherProfileId, subjectId })
  }

  @Get()
  findAll() {
    return this.sectionService.findAll()
  }

  @Get(':teacherProfileId')
  findOne(@Param('teacherProfileId') teacherProfileId: string) {
    return this.sectionService.findOne(teacherProfileId)
  }

  @Delete(':id')
  remove(@Param('id') teacherProfileId: string) {
    return this.sectionService.remove(teacherProfileId)
  }
}
