import { Injectable } from '@nestjs/common';
import { CreateSupporterDto } from './dto/create-supporter.dto';
import { UpdateSupporterDto } from './dto/update-supporter.dto';

@Injectable()
export class SupportersService {
  create(createSupporterDto: CreateSupporterDto) {
    return 'This action adds a new supporter';
  }

  findAll() {
    return `This action returns all supporters`;
  }

  findOne(id: number) {
    return `This action returns a #${id} supporter`;
  }

  update(id: number, updateSupporterDto: UpdateSupporterDto) {
    return `This action updates a #${id} supporter`;
  }

  remove(id: number) {
    return `This action removes a #${id} supporter`;
  }
}
