import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AccessJwtDto } from '../common/types'

@Injectable()
export class StudentProfileGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  public canActivate(context: ExecutionContext): boolean {
    console.log('here')
    const request = context.switchToHttp().getRequest()

    const studentProfileId = request?.params?.studentProfileId
    if (!studentProfileId) {
      return true
    }

    const user = request.user as AccessJwtDto
    if (!user) {
      return false
    }

    return user?.studentProfileIds?.includes(studentProfileId)
  }
}
