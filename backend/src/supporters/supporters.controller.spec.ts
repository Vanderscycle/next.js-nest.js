import { Test, TestingModule } from '@nestjs/testing';
import { SupportersController } from './supporters.controller';
import { SupportersService } from './supporters.service';
// import CREATE_USER_MOCK from './mock-data/createSupporterDto.mock.json';
// import USER_MOCK from './mock-data/user.mock.json';
import { CreateSupporterDto } from './dto/create-supporter.dto';

describe('SupportersController', () => {
  let supporterController: SupportersController;
  let supporterService: SupportersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SupportersController],
      providers: [
        {
          provide: SupportersService,
          useValue: {
            create: jest
              .fn()
              .mockImplementation((supporter: CreateSupporterDto) =>
                Promise.resolve({ id: 1, ...supporter }),
              ),
          },
        },
      ],
    }).compile();

    supporterController =
      module.get<SupportersController>(SupportersController);
    supporterService = module.get<SupportersService>(SupportersService);
  });
  it('should be defined', () => {
    expect(supporterController).toBeDefined();
  });

  describe('CRUD controller operations', () => {
    it('POST should work', async () => {
      const createSupporterDto: CreateSupporterDto = {
        name: 'str',
        username: '92929292',
        password: 'string;',
      };
      await expect(
        supporterController.create(createSupporterDto),
      ).resolves.toEqual({
        id: 1,
        ...createSupporterDto,
      });
      // console.log(CREATE_USER_MOCK, USER_MOCK);
    });
  });
});
