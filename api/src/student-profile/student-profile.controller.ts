import { Controller, Post, Body } from '@nestjs/common'
import { StudentProfileService } from './student-profile.service'
import { CreateStudentProfileDto } from './student-profile.dto'
import { AccessJwtPayload } from '../common/decorators/auth.decorator'
import { AccessJwtDto } from '../common/types'

// Todo Add Guard
@Controller('student-profiles')
export class StudentProfileController {
  constructor(private readonly studentService: StudentProfileService) {}

  @Post()
  public async create(
    @Body() createStudentDto: CreateStudentProfileDto,
    @AccessJwtPayload() accessJwtPayload: AccessJwtDto,
  ) {
    // Todo We should update token after creation of profile
    return await this.studentService.createProfile(createStudentDto, accessJwtPayload.userId)
  }
}
