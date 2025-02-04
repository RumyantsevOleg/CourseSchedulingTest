import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AccessJwtDto } from '../common/types'

@Injectable()
export class StudentProfileGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  public canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest()

    const user = request.user as AccessJwtDto

    const studentProfileId = request.user.studentProfileId
    if (!studentProfileId) {
      return true
    }
    if (user.studentProfileIds.includes(studentProfileId)) {
      return true
    }

    throw new ForbiddenException('Access error')
  }
}
