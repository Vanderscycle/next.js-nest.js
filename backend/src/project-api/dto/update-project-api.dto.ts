import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectApiDto } from './create-project-api.dto';

export class UpdateProjectApiDto extends PartialType(CreateProjectApiDto) {}
