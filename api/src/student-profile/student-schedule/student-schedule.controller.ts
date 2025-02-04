import { Controller, Get, Post, Body, Param, Delete, ParseUUIDPipe, Res, UseGuards } from '@nestjs/common'
import { Response } from 'express'
import { StudentScheduleService } from './student-schedule.service'
import { CreateScheduleDto } from './student-schedule.dto'

import { generatePDFSchedule } from '../../common/utilities/pdf'
import { StudentProfileGuard } from '../student-profile.guard'

@UseGuards(StudentProfileGuard)
@Controller('student-profiles/:studentProfileId/schedules')
export class StudentScheduleController {
  constructor(private readonly scheduleService: StudentScheduleService) {}

  @Post()
  public async create(
    @Body() createScheduleDto: CreateScheduleDto,
    @Param('studentProfileId') studentProfileId: string,
  ) {
    return await this.scheduleService.createSectionSubscription(createScheduleDto, studentProfileId)
  }

  @Delete(':scheduleId')
  public async delete(@Param('scheduleId') scheduleId: string, @Param('studentProfileId') studentProfileId: string) {
    return await this.scheduleService.delete(scheduleId, studentProfileId)
  }

  @Get()
  public async findAll(@Param('studentProfileId', new ParseUUIDPipe()) studentProfileId: string) {
    return this.scheduleService.getStudentSchedules(studentProfileId)
  }

  // Todo this is temporary solution. It is good idea to render files with queue and save it with S3. Or implement cashing
  @Get('/pdf')
  public async getPdfSchedule(
    @Param('studentProfileId', new ParseUUIDPipe()) studentProfileId: string,
    @Res() res: Response,
  ) {
    const stream = res.writeHead(200, {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline;filename=schedule.pdf',
    })

    const scheduleData = await this.scheduleService.getStudentSchedules(studentProfileId)

    return generatePDFSchedule(scheduleData, studentProfileId, stream)
  }
}
