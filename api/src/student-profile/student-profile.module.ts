import { Module } from '@nestjs/common'
import { StudentProfileService } from './student-profile.service'
import { StudentProfileController } from './student-profile.controller'
import { UserModule } from '../user/user.module'
import { PrismaModule } from '../common/prisma/prisma.module'

@Module({
  imports: [UserModule, PrismaModule],
  controllers: [StudentProfileController],
  providers: [StudentProfileService],
})
export class StudentProfileModule {}
