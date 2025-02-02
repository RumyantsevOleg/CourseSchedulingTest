import { Module } from '@nestjs/common'
import { SectionService } from './section.service'
import { SectionController } from './section.controller'
import { PrismaModule } from '../../../common/prisma/prisma.module'

@Module({
  imports: [PrismaModule],
  controllers: [SectionController],
  providers: [SectionService],
})
export class SectionModule {}
