import { StudentProfile } from '@prisma/client'
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator'

export class StudentProfileDto {}

export class CreateStudentProfileDto implements Partial<StudentProfile> {
  @IsNotEmpty()
  @IsString()
  @MaxLength(40)
  @MinLength(2)
  nikname: string
}
