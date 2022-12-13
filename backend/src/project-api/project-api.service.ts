import { Injectable } from '@nestjs/common';
import { CreateProjectApiDto } from './dto/create-project-api.dto';
import { UpdateProjectApiDto } from './dto/update-project-api.dto';

@Injectable()
export class ProjectApiService {
  create(createProjectApiDto: CreateProjectApiDto) {
    return 'This action adds a new projectApi';
  }

  findAll() {
    return `This action returns all projectApi`;
  }

  findOne(id: number) {
    return `This action returns a #${id} projectApi`;
  }

  update(id: number, updateProjectApiDto: UpdateProjectApiDto) {
    return `This action updates a #${id} projectApi`;
  }

  remove(id: number) {
    return `This action removes a #${id} projectApi`;
  }
}
