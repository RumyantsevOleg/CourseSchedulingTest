import { Controller, Get, Post, Body, Param, Delete, ParseUUIDPipe } from '@nestjs/common'
import { SectionService } from './section.service'
import { CreateSectionDto } from './section.dto'
import { AccessJwtPayload } from '../../../common/decorators/auth.decorator'
import { AccessJwtDto } from '../../../common/types'
import { IsUUID } from 'class-validator'

// Todo add guard
@Controller('teacher-profile/:teacherId/subjects/:subjectId/sections')
export class SectionController {
  constructor(private readonly sectionService: SectionService) {}

  @Post()
  public async create(
    @Body() createSectionDto: CreateSectionDto,
    @AccessJwtPayload() accessJwtPayload: AccessJwtDto,
    @Param('subjectId', new ParseUUIDPipe()) subjectId: string,
    @Param('teacherId', new ParseUUIDPipe()) teacherId: string,
  ) {
    return this.sectionService.create(createSectionDto, { teacherId, subjectId })
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
