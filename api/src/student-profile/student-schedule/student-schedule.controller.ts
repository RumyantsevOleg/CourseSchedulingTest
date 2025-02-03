import { Controller, Get, Post, Body, Param, Delete, ParseUUIDPipe, Res } from '@nestjs/common'
import { Response } from 'express'
import { StudentScheduleService } from './student-schedule.service'
import { CreateScheduleDto } from './student-schedule.dto'
import { AccessJwtPayload } from '../../common/decorators/auth.decorator'
import { AccessJwtDto } from '../../common/types'

import * as PdfDocument from 'pdfkit'
import { generatePDF } from '../../common/utilities/pdf'

// Todo Add Guard
@Controller('student-profiles/:studentId/schedules')
export class StudentScheduleController {
  constructor(private readonly scheduleService: StudentScheduleService) {}

  @Post()
  public async create(
    @Body() createScheduleDto: CreateScheduleDto,
    @AccessJwtPayload() accessJwtPayload: AccessJwtDto,
    @Param('studentId') studentId: string,
  ) {
    return await this.scheduleService.createSectionSubscription(createScheduleDto, studentId)
  }

  @Delete(':scheduleId')
  public async delete(
    @Param('scheduleId') scheduleId: string,
    @Param('studentId') studentId: string,
    @AccessJwtPayload() accessJwtPayload: AccessJwtDto,
  ) {
    return await this.scheduleService.delete(scheduleId, studentId)
  }

  @Get()
  public async findAll(
    @Param('studentId', new ParseUUIDPipe()) studentId: string,
    @AccessJwtPayload() accessJwtPayload: AccessJwtDto,
  ) {
    return this.scheduleService.getStudentSchedules(studentId)
  }

  // Todo this is temporary solution. It is good idea to render files with queue and save it with S3. Or implement cashing
  @Get('/pdf')
  public async getPdfSchedule(@Param('studentId', new ParseUUIDPipe()) studentId: string, @Res() res: Response) {
    const stream = res.writeHead(200, {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment;filename=schedule.pdf',
    })

    const scheduleData = await this.scheduleService.getStudentSchedules(studentId)

    return generatePDF(scheduleData, studentId, stream)
  }
}
