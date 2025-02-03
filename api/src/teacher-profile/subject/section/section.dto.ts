import { IsString, IsIn, IsArray, ValidateNested, IsUUID, IsDateString, IsOptional, IsNumber } from 'class-validator'
import { Type } from 'class-transformer'
import { Section } from '@prisma/client'

class SectionSchedule {
  @IsIn([1, 2, 3, 4, 5, 6, 7])
  day: number // 1 - Mon; 7 - Sat

  @IsNumber()
  startTime: number // Minutes

  @IsNumber()
  durationMin: number // Minutes
}

export class CreateSectionDto implements Partial<Section> {
  @IsString()
  name: string

  @IsString()
  @IsOptional()
  description: string

  @IsUUID()
  classroomId: string

  @IsDateString()
  startDate: Date

  @IsDateString()
  endDate: Date

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SectionSchedule)
  schedule: SectionSchedule[]
}
