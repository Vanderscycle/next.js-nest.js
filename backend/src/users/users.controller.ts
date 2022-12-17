import { Controller, Delete, Get, Param, Post, Request } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { UserInterface } from './interface/user.interface';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('ids')
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

  @ApiOkResponse({ type: UserEntity })
  @ApiBadRequestResponse() //because of class validators
  @Post()
  async newEntry(@Request() req: any): Promise<any> {
    console.log(req);
    return this.usersService.createOne(req);
  }
}
