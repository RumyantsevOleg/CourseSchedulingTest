import { IsString, Matches, IsIn, IsNotEmpty, IsArray, ValidateNested, IsObject, IsUUID } from 'class-validator'
import { Type } from 'class-transformer'
import { Section } from '@prisma/client'

enum DaysOfWeek {
  Monday = 'Monday',
  Tuesday = 'Tuesday',
  Wednesday = 'Wednesday',
  Thursday = 'Thursday',
  Friday = 'Friday',
  Saturday = 'Saturday',
  Sunday = 'Sunday',
}

const timePattern = /^([01]?[0-9]|2[0-3]):([0-5][0-9])$/

class SectionSchedule {
  @IsIn(Object.values(DaysOfWeek))
  day: DaysOfWeek

  @IsString()
  @Matches(timePattern, { message: 'startTime should be in the format HH:mm' })
  @IsNotEmpty()
  startTime: string

  @IsString()
  @Matches(timePattern, { message: 'endTime should be in the format HH:mm' })
  @IsNotEmpty()
  endTime: string
}

export class CreateSectionDto implements Partial<Section> {
  @IsUUID()
  classroomId: string

  @IsUUID()
  subjectId: string

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SectionSchedule)
  schedule: SectionSchedule[]
}
