import { Body, Controller, Get, Post } from '@nestjs/common'

import { AuthService } from './auth.service'
import { LoginDto, RegisterDto } from './auth.dto'
import { AccessJwtPayload, Public } from '../common/decorators/auth.decorator'
import { AccessJwtDto } from '../common/types'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Public()
  private async loginWithEmail(@Body() bodyPayload: LoginDto) {
    const { accessToken } = await this.authService.login(bodyPayload)

    // Todo Set as http only token cookies
    return { accessToken }
  }

  @Post('register')
  @Public()
  private async registerWithEmail(@Body() bodyPayload: RegisterDto) {
    const { accessToken } = await this.authService.register(bodyPayload)

    // Todo Set as http only token cookies
    return { accessToken }
  }

  @Get('/profiles')
  @Public()
  private async getMyProfiles(@AccessJwtPayload() accessPayload: AccessJwtDto) {
    return await this.authService.getProfiles(accessPayload.userId)
  }
}
