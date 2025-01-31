import { Injectable } from '@nestjs/common'
import { SubjectDto } from './subject.dto'

@Injectable()
export class SubjectService {
  create(createSubjectDto: SubjectDto) {
    return 'This action adds a new subject'
  }

  findAll() {
    return `This action returns all subject`
  }

  findOne(id: number) {
    return `This action returns a #${id} subject`
  }

  update(id: number, updateSubjectDto) {
    return `This action updates a #${id} subject`
  }

  remove(id: number) {
    return `This action removes a #${id} subject`
  }
}
