import { Request, Response } from 'express'
import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common'

import { verifyJwtToken } from '../utilities/crypto'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  public use(req: Request & { [key: string]: any }, res: Response, next: () => any) {
    const Authorization = req.header('Authorization') || req.cookies?.Authorization
    if (typeof Authorization !== 'string') {
      req.user = null
      return next()
    }

    const [authType, token] = Authorization?.split(' ')
    if (authType !== 'Bearer') {
      throw new UnauthorizedException('Invalid Authorization Type')
    }

    if (token) {
      try {
        // Todo We can use specific method to change req (without direct modification)
        req.user = verifyJwtToken(token)

        return next()
      } catch (err) {
        console.log(err)
        throw new UnauthorizedException('No valid token provided')
      }
    }

    return next()
  }
}
