import { NestFactory } from '@nestjs/core'
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common'
import { NestExpressApplication } from '@nestjs/platform-express'
import { ConfigService } from '@nestjs/config'
import { NextFunction, Request, Response } from 'express'
import * as cookieParser from 'cookie-parser'

import { AppModule } from './app.module'

import type { AppConfigType } from './config'

async function bootstrap() {
  const logger = new Logger('bootstrap')
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: process.env.NODE_ENV === 'development' ? ['debug', 'error', 'log', 'verbose', 'warn'] : ['error', 'warn'],
  })

  // Todo. Error response format can be improved
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }))
  app.enableVersioning({
    type: VersioningType.URI,
  })
  app.setGlobalPrefix('api')

  app.use((req: Request, res: Response, next: NextFunction) => {
    res.removeHeader('x-powered-by')
    res.removeHeader('date')
    next()
  })

  const configService: ConfigService<AppConfigType> = app.get(ConfigService)
  const { apiPort } = configService.get<AppConfigType['api']>('api')!

  app.use(cookieParser())

  app.enableCors({
    origin: '*',
    credentials: true,
    // allows the frontend to access the Authorization and Authorization-Refresh headers
    exposedHeaders: ['Authorization', 'Authorization-Refresh'],
  })

  await app.listen(apiPort, '0.0.0.0')

  logger.log(`Application is running on: ${await app.getUrl()}`)
}
bootstrap()
