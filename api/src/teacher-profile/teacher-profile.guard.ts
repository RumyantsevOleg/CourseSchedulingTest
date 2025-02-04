import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AccessJwtDto } from '../common/types'

// Todo not connected
@Injectable()
export class TeacherProfileGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  public canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest()

    const user = request.user as AccessJwtDto

    const teacherProfile = request?.params?.teacherProfileId
    if (!teacherProfile) {
      return true
    }
    if (user.teacherProfileIds.includes(teacherProfile)) {
      return true
    }

    throw new ForbiddenException('Access error')
  }
}
