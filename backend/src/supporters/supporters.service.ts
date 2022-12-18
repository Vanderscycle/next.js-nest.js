import { Injectable, Logger } from '@nestjs/common';
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
  private readonly logger = new Logger('Supporter');

  async create(
    createSupporterDto: CreateSupporterDto,
  ): Promise<SupporterInterface | undefined> {
    const supporter = new Supporter();
    supporter.id = 69;
    supporter.name = createSupporterDto.name;
    supporter.password = createSupporterDto.password;
    supporter.username = createSupporterDto.username;
    this.logger.log(`LOGGER ${JSON.stringify(supporter)}`);
    return await this.supporterRepository.save({ ...supporter });
  }

  async findAll(): Promise<SupporterInterface[]> {
    return await this.supporterRepository.find();
  }

  async findOne(id: number): Promise<SupporterInterface> {
    return await this.supporterRepository.findOneBy({ id });
  }

  async update(
    id: number,
    updateSupporterDto: UpdateSupporterDto,
  ): Promise<SupporterInterface | undefined> {
    const item: SupporterInterface = await this.supporterRepository.findOneBy({
      id,
    });
    if (item) {
      const supporter = new Supporter();
      supporter.id = item.id;
      supporter.name = updateSupporterDto.name;
      supporter.password = updateSupporterDto.password;
      supporter.username = updateSupporterDto.username;
      return await this.supporterRepository.save({ ...supporter });
    }
    return;
    // return `This action updates a #${id} supporter ${updateSupporterDto}`;
  }

  async remove(id: number): Promise<SupporterInterface | undefined> {
    const item: SupporterInterface = await this.supporterRepository.findOneBy({
      id,
    });
    if (item) {
      await this.supporterRepository.delete(id);
      return item;
    }
    return;
  }
}
