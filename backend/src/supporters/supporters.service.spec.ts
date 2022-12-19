import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSupporterDto } from './dto/create-supporter.dto';
import { SupporterEntity } from './entities/supporter.entity';
import { SupportersService } from './supporters.service';
const newSupporter: CreateSupporterDto = {
  name: 'str',
  username: '92929292',
  password: 'string;',
};

describe('SupportersService', () => {
  let service: SupportersService;
  let repo: Repository<SupporterEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SupportersService,
        {
          provide: getRepositoryToken(SupporterEntity),
          useValue: {
            create: jest.fn().mockResolvedValue(newSupporter),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<SupportersService>(SupportersService);
    repo = module.get<Repository<SupporterEntity>>(
      getRepositoryToken(SupporterEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // describe('CRUD service operations', () => {
  //   it('svc create should work', async () => {
  //     expect(
  //       service.create({
  //         name: 'str',
  //         username: '92929292',
  //         password: 'string',
  //       }),
  //     ).resolves.toEqual(newSupporter);
  //     expect(repo.create).toBeCalledTimes(1);
  //   });
  // });
});
