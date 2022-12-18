import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSupporterDto } from './dto/create-supporter.dto';
import { UpdateSupporterDto } from './dto/update-supporter.dto';
import { Supporter } from './entities/supporter.entity';
import { SupporterInterface } from './interfaces/supporters.interface';

@Injectable()
export class SupportersService {
  constructor(
    @InjectRepository(Supporter)
    private supporterRepository: Repository<Supporter>,
  ) {}

  async create(
    createSupporterDto: CreateSupporterDto,
  ): Promise<SupporterInterface | undefined> {
    const supporter = new Supporter();
    supporter.id = 69;
    supporter.name = createSupporterDto.name;
    supporter.password = createSupporterDto.password;
    supporter.username = createSupporterDto.username;
    return await this.supporterRepository.save({ ...supporter });
  }

  async findAll(): Promise<SupporterInterface[]> {
    return this.supporterRepository.find();
  }

  async findOne(id: number): Promise<SupporterInterface> {
    return this.supporterRepository.findOneBy({ id });
  }

  update(id: number, updateSupporterDto: UpdateSupporterDto) {
    return `This action updates a #${id} supporter ${updateSupporterDto}`;
  }

  remove(id: number) {
    return `This action removes a #${id} supporter`;
  }
}
