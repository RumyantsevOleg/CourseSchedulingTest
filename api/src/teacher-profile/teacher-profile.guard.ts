import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AccessJwtDto } from '../common/types'

// Todo not connected
@Injectable()
export class TeacherProfileGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  public canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest()

    const teacherProfile = request?.params?.teacherProfileId
    if (!teacherProfile) {
      return true
    }

    const user = request.user as AccessJwtDto
    if (!user) {
      return false
    }

    return user?.teacherProfileIds?.includes(teacherProfile)
  }
}
