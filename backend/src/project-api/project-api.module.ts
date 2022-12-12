import { Module } from "@nestjs/common";
import { ProjectApiService } from "./project-api.service";
import { ProjectApiController } from "./project-api.controller";

@Module({
  controllers: [ProjectApiController],
  providers: [ProjectApiService],
})
export class ProjectApiModule {}
