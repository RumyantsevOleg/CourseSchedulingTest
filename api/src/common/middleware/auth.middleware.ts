import { Request, Response } from 'express'
import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common'

import { verifyJwtToken } from '../utilities/crypto'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  public use(req: Request & { [key: string]: any }, res: Response, next: () => any) {
    const accessToken = req.header('access-token') // Todo we can use cookies

    if (accessToken) {
      try {
        const user = verifyJwtToken(accessToken)

        // Todo We can use specific method to change req (without direct modification)
        req.user = user

        return next()
      } catch (err) {
        console.log(err)
        throw new UnauthorizedException('No valid token provided')
      }
    }

    return next()
  }
}
