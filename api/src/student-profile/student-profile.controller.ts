import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
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

  @Get()
  findAll() {
    return this.studentService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentDto) {
    return this.studentService.update(id, updateStudentDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentService.remove(id)
  }
}
