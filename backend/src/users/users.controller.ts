import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from './dto/user.dto';
import { UserEntity } from './entities/user.entity';
import { UserInterface } from './interface/user.interface';
import { UsersService } from './users.service';
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getAllUsers(): Promise<UserInterface[]> {
    return this.usersService.findAll();
  }

  @Get('id')
  async getOneUser(@Param('id') id: string): Promise<UserInterface> {
    return this.usersService.findOne(id);
  }

  @ApiOkResponse({ type: UserEntity })
  @ApiBadRequestResponse() //because of class validators
  @Delete(':id')
  async deleteEntry(@Param('id') id: string): Promise<any> {
    const deletedValue = this.usersService.findOne(id);
    this.usersService.deleteOne(id);
    return deletedValue;
  }

  @ApiCreatedResponse({ type: UserEntity })
  @ApiBadRequestResponse() //because of class validators
  @Post()
  async newEntry(@Body() createUserDto: CreateUserDto): Promise<any> {
    // return createUserDto;
    return this.usersService.createOne(createUserDto);
  }
}
