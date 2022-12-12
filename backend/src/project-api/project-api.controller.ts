import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ProjectApiService } from "./project-api.service";
import { CreateProjectApiDto } from "./dto/create-project-api.dto";
import { UpdateProjectApiDto } from "./dto/update-project-api.dto";

@Controller("project-api")
export class ProjectApiController {
  constructor(private readonly projectApiService: ProjectApiService) {}

  @Post()
  create(@Body() createProjectApiDto: CreateProjectApiDto) {
    return this.projectApiService.create(createProjectApiDto);
  }

  @Get()
  findAll() {
    return this.projectApiService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.projectApiService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateProjectApiDto: UpdateProjectApiDto,
  ) {
    return this.projectApiService.update(+id, updateProjectApiDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.projectApiService.remove(+id);
  }
}
