import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common'
import { SubjectService } from './subject.service'

@Controller('teacher-profiles/:teacherProfileId/subjects')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Get()
  findAll(@Param('teacherProfileId', new ParseUUIDPipe()) teacherProfileId: string) {
    return this.subjectService.findAll(teacherProfileId)
  }
}
