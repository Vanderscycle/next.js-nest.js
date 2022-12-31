import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SupportersService } from './supporters.service';
import { CreateSupporterDto } from './dto/create-supporter.dto';
import { UpdateSupporterDto } from './dto/update-supporter.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { SupporterEntity } from './entities/supporter.entity';

@ApiTags('supporters')
@Controller('supporters')
export class SupportersController {
  constructor(private readonly supportersService: SupportersService) {}

  @ApiOperation({ summary: 'Add a new user/supporter' })
  @ApiCreatedResponse({
    description: 'Created Succesfully',
    type: SupporterEntity,
  })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiBody({ description: 'creates new supporter', type: CreateSupporterDto })
  @Post()
  create(@Body() createSupporterDto: CreateSupporterDto) {
    return this.supportersService.create(createSupporterDto);
  }

  @ApiOperation({ summary: 'Get all user/supporter' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiOkResponse({
    description: 'The resources were returned successfully',
    type: SupporterEntity,
    isArray: true,
  })
  @Get()
  findAll() {
    return this.supportersService.findAll();
  }

  @ApiOperation({ summary: 'Get one user/supporter' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  @ApiOkResponse({
    description: 'The resource was returned successfully',
    status: 200,
    type: SupporterEntity,
  })
  // @ApiQuery({ id: 'number', required: true })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.supportersService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update one user/supporter' })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  @ApiOkResponse({
    description: 'The resource was updated successfully',
    status: 200,
    type: SupporterEntity,
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSupporterDto: UpdateSupporterDto,
  ) {
    return this.supportersService.update(+id, updateSupporterDto);
  }

  @ApiOperation({ summary: 'Delete one user/supporter' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  @ApiOkResponse({
    description: 'The resource was returned successfully',
    type: SupporterEntity,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.supportersService.remove(+id);
  }
}
