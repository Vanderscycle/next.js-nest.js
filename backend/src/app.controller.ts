import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { LoginDto } from './auth/dto/login.dto';
import { LocalAuthguard } from './auth/local-auth.guard';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(LocalAuthguard)
  @Post('login')
  async login(@Request() req: any) {
    return req.user;
    // return 'hello';
  }
  // async login(@Body() payload: LoginDto): Promise<any> {
  //   console.log('echo input', payload);
  //   return payload.username;
  // }

  @Get('protected')
  getHello(): string {
    return this.appService.getHello();
  }
}
