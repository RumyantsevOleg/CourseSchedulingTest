import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import config from './config'

import { UserModule } from './user/user.module'
import { PrismaModule } from './common/prisma/prisma.module'
import { SubjectModule } from './teacher-profile/subject/subject.module'
import { ClassroomModule } from './teacher-profile/classroom/classroom.module'
import { TeacherProfileModule } from './teacher-profile/teacher-profile.module'
import { StudentProfileModule } from './student-profile/student-profile.module'
import { SectionModule } from './teacher-profile/subject/section/section.module'
import { AuthModule } from './auth/auth.module'
import { AuthMiddleware } from './common/middleware/auth.middleware'
import { StudentScheduleModule } from './student-profile/student-schedule/student-schedule.module'

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({
      envFilePath: [`.env.${process.env.NODE_ENV}`, '.env', `.env.${process.env.NODE_ENV}.local`, '.env.local'],
      isGlobal: true,
      load: [config],
    }),

    AuthModule,

    UserModule,

    SectionModule,
    SubjectModule,
    ClassroomModule,
    TeacherProfileModule,

    StudentScheduleModule,
    StudentProfileModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*')
  }
}
