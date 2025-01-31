import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { CreateUserDto, FilterUserDto } from './user.dto'

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  public async findOne(filterDto: FilterUserDto) {
    if (filterDto?.id) {
      return this.prisma.user.findUnique({
        where: {
          id: filterDto.id,
        },
      })
    }

    if (filterDto?.email) {
      return this.prisma.user.findUnique({
        where: {
          email: filterDto.email,
        },
      })
    }

    return null
  }

  public async getUserProfiles(userId: string) {
    const data = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },

      select: {
        id: true,
        TeacherProfiles: { select: { id: true } },
        StudentProfiles: { select: { id: true } },
      },
    })

    const profiles = {
      userId: data.id,
      teacherProfileIds: data.TeacherProfiles.map(item => item.id),
      studentProfileIds: data.StudentProfiles.map(item => item.id),
    }
    return profiles
  }

  public async create(user: CreateUserDto) {
    return this.prisma.user.create({ data: user })
  }
}
