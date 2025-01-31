import { SetMetadata, UnauthorizedException } from '@nestjs/common'
import { UserRoles } from '../constants'

import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { AccessJwtDto } from '../types'

export const AccessJwtPayload = createParamDecorator((data: unknown, ctx: ExecutionContext): AccessJwtDto => {
  const request = ctx.switchToHttp().getRequest()

  const user = request.user
  if (!user) {
    // Todo is it possible to improve it?
    throw new UnauthorizedException('Invalid access token')
  }

  return user as AccessJwtDto
})

export const Public = () => {
  return SetMetadata('isPublic', true)
}

export const Roles = (roles: Array<typeof UserRoles>) => {
  return SetMetadata('roles', roles)
}
