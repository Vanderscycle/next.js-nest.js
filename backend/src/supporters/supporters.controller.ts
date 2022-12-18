import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SupportersService } from './supporters.service';
import { CreateSupporterDto } from './dto/create-supporter.dto';
import { UpdateSupporterDto } from './dto/update-supporter.dto';

@Controller('supporters')
export class SupportersController {
  constructor(private readonly supportersService: SupportersService) {}

  @Post()
  create(@Body() createSupporterDto: CreateSupporterDto) {
    return this.supportersService.create(createSupporterDto);
  }

  @Get()
  findAll() {
    return this.supportersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.supportersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSupporterDto: UpdateSupporterDto) {
    return this.supportersService.update(+id, updateSupporterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.supportersService.remove(+id);
  }
}
