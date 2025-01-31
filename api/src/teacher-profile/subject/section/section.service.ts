import { Injectable } from '@nestjs/common'

@Injectable()
export class SectionService {
  create(createSectionDto) {
    return 'This action adds a new section'
  }

  findAll() {
    return `This action returns all section`
  }

  findOne(id: number) {
    return `This action returns a #${id} section`
  }

  update(id: number, updateSectionDto) {
    return `This action updates a #${id} section`
  }

  remove(id: number) {
    return `This action removes a #${id} section`
  }
}
