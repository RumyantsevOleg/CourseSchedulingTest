import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common'
import { LoginDto, RegisterDto } from './auth.dto'
import { UserService } from '../user/user.service'
import { comparePassword, generateJwtToken, hashPassword } from '../common/utilities/crypto'
import { AccessJwtDto } from '../common/types'

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  private generateAccessToken(payload: AccessJwtDto): string {
    return generateJwtToken({
      userId: payload.userId,
      teacherProfileIds: payload.teacherProfileIds || [],
      studentProfileIds: payload.studentProfileIds || [],
    })
  }

  private compareAccessToken(password: string, storedHash: string): Promise<boolean> {
    return comparePassword(password, storedHash).then(Boolean)
  }

  public async register(registerDto: RegisterDto) {
    const existingUser = await this.userService.findOne({ email: registerDto.email })
    if (existingUser) {
      // Todo This is not secure because of leaking data (we need to handle errors before sending data to front-end)
      throw new ConflictException('User already exists')
    }

    const hashedPass = await hashPassword(registerDto.password)
    if (typeof hashedPass !== 'string') {
      throw new Error('Something went wrong')
    }

    const createResponse = await this.userService.create({
      ...registerDto,
      password: hashedPass,
      birthDate: new Date(registerDto.birthDate),
    })
    if (!createResponse) {
      // Todo This is not secure because of leaking data (we need to handle errors before sending data to front-end)
      throw new Error('Something went wrong')
    }

    const accessToken = this.generateAccessToken({
      userId: createResponse.id,
      studentProfileIds: [],
      teacherProfileIds: [],
    })

    return { createResponse, accessToken }
  }

  public async login(loginDto: LoginDto) {
    const existingUser = await this.userService.findOne({ email: loginDto.email })
    if (!existingUser) {
      throw new UnauthorizedException('User not found') // Todo This is not secure because of leaking data (we need to handle errors before sending data to front-end)
    }

    const passwordMatch = await this.compareAccessToken(loginDto.password, existingUser.password)
    if (!passwordMatch) {
      throw new UnauthorizedException('Login or password is incorrect')
    }

    const profile = await this.userService.getUserProfiles(existingUser.id)

    const accessToken = this.generateAccessToken({
      userId: existingUser.id,
      studentProfileIds: profile.studentProfileIds,
      teacherProfileIds: profile.teacherProfileIds,
    })

    return { accessToken }
  }

  public async getProfiles(userIdForSearch: string) {
    try {
      const { userId, studentProfileIds, teacherProfileIds } = await this.userService.getUserProfiles(userIdForSearch)

      const accessToken = this.generateAccessToken({
        userId,
        studentProfileIds,
        teacherProfileIds,
      })

      return {
        userId,
        accessToken,
        studentProfileIds,
        teacherProfileIds,
      }
    } catch (err) {
      console.error(err)
      throw new UnauthorizedException('User not found')
    }
  }
}
