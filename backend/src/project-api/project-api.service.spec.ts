import { Test, TestingModule } from '@nestjs/testing';
import { ProjectApiService } from './project-api.service';

describe('ProjectApiService', () => {
  let service: ProjectApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectApiService],
    }).compile();

    service = module.get<ProjectApiService>(ProjectApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
