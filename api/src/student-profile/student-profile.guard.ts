import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AccessJwtDto } from '../common/types'

// Todo not connected
@Injectable()
export class StudentProfileGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  public canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest()

    const user = request.user as AccessJwtDto

    if (user.studentProfileIds.includes(request.user.id)) {
      return true
    }

    throw new ForbiddenException('Access error')
  }
}
