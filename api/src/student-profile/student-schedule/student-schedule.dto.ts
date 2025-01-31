// Todo Here it is point where we can scale our system
import { ScheduleType } from '../../common/constants'
import { IsEnum, IsString, IsUUID } from 'class-validator'

export class CreateScheduleDto {
  @IsString()
  @IsEnum(ScheduleType)
  type: ScheduleType

  @IsUUID()
  sectionId: string
}
