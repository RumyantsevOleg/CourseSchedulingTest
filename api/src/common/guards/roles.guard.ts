import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { UserRoles } from '../constants'
import { AccessJwtDto } from '../types'

const DEFAULT_ROLES = Object.values(UserRoles)

// Todo not connected
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  public canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest()
    const roles = this.reflector.get<string[]>('roles', context.getHandler())
    const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler())

    const rolesToCheck = roles || DEFAULT_ROLES
    const user: AccessJwtDto = request.user

    // "Public" decorator has bigger priority than "Roles"
    if (isPublic) {
      return true
    }

    // if (rolesToCheck) { // Todo
    //   return true
    // }

    throw new ForbiddenException('Access error')
  }
}
