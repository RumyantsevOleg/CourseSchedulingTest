import { Controller, Get, Post, Body, Param, Delete, ParseUUIDPipe } from '@nestjs/common'
import { StudentScheduleService } from './student-schedule.service'
import { CreateScheduleDto } from './student-schedule.dto'
import { AccessJwtPayload } from '../../common/decorators/auth.decorator'
import { AccessJwtDto } from '../../common/types'

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
    return this.scheduleService.findMany(studentId)
  }
}
