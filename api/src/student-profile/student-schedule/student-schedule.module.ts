import { Module } from '@nestjs/common'
import { StudentScheduleService } from './student-schedule.service'
import { StudentScheduleController } from './student-schedule.controller'
import { PrismaService } from '../../common/prisma/prisma.service'

@Module({
  controllers: [StudentScheduleController],
  providers: [StudentScheduleService, PrismaService],
})
export class StudentScheduleModule {}
