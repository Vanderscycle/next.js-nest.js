import { Test, TestingModule } from '@nestjs/testing';
import { SupportersController } from './supporters.controller';
import { SupportersService } from './supporters.service';
import * as CREATE_USER_MOCK from './mock-data/createSupporterDto.mock.json';

describe('SupportersController', () => {
  let controller: SupportersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SupportersController],
      providers: [SupportersService],
    }).compile();

    controller = module.get<SupportersController>(SupportersController);
  });

  describe('CRUD operations', () => {
    it('POST should work', async () => {
      const rest = await controller.create(CREATE_USER_MOCK);
      console.log(rest);
      // expect(rest).toBeDefined();
    });
  });
});
