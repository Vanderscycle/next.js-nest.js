import { Test, TestingModule } from '@nestjs/testing';
import { SupportersController } from './supporters.controller';
import { SupportersService } from './supporters.service';

describe('SupportersController', () => {
  let controller: SupportersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SupportersController],
      providers: [SupportersService],
    }).compile();

    controller = module.get<SupportersController>(SupportersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
