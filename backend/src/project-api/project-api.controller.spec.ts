import { Test, TestingModule } from "@nestjs/testing";
import { ProjectApiController } from "./project-api.controller";
import { ProjectApiService } from "./project-api.service";

describe("ProjectApiController", () => {
  let controller: ProjectApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectApiController],
      providers: [ProjectApiService],
    }).compile();

    controller = module.get<ProjectApiController>(ProjectApiController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
