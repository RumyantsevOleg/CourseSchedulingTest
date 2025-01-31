import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateStudentProfileDto } from './student-profile.dto'
import { PrismaService } from '../common/prisma/prisma.service'
import { UserService } from '../user/user.service'

@Injectable()
export class StudentProfileService {
  constructor(
    private prismaService: PrismaService,
    private userService: UserService,
  ) {}

  public async createProfile(createStudentDto: CreateStudentProfileDto, userId: string) {
    const user = await this.userService.findOne({ id: userId })
    if (!user) {
      throw new NotFoundException('User not found')
    }

    return this.prismaService.studentProfile.create({
      data: {
        ...createStudentDto,
        User: { connect: user },
      },
    })
  }

  findAll() {
    return `This action returns all student`
  }

  findOne(id: string) {
    return `This action returns a #${id} student`
  }

  update(id: string, updateStudentDto) {
    return `This action updates a #${id} student`
  }

  remove(id: string) {
    return `This action removes a #${id} student`
  }
}
