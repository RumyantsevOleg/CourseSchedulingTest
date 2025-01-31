import { IsEmail, IsISO8601, IsNotEmpty, MaxLength, MinLength } from 'class-validator'

export class LoginDto {
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string

  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @MaxLength(32, { message: 'Password must not exceed 32 characters' })
  @IsNotEmpty({ message: 'Password is required' })
  password: string
}

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  email: string

  @MinLength(6)
  @MaxLength(32)
  @IsNotEmpty()
  password: string

  @IsNotEmpty()
  @MaxLength(50)
  firstName: string

  @IsNotEmpty()
  @MaxLength(50)
  lastName: string

  @IsISO8601({})
  @IsNotEmpty()
  birthDate: Date
}
