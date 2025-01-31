import { IsDateString, IsEmail, IsOptional, IsString, MinLength } from 'class-validator'
import { Expose } from 'class-transformer'
import { User } from '@prisma/client'

export class FilterUserDto {
  @IsString()
  @IsOptional()
  email?: string

  @IsString()
  @IsOptional()
  id?: string
}

export class CreateUserDto implements Partial<User> {
  @IsString()
  @IsEmail()
  email: string

  @IsString()
  @MinLength(6)
  password: string

  @IsOptional()
  @MinLength(2)
  firstName: string

  @MinLength(2)
  lastName: string

  @IsDateString()
  birthDate: Date
}

export class UserDto {
  @Expose()
  id: string

  @Expose()
  email: string
}
