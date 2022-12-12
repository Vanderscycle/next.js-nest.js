import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthguard } from './auth/local-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(LocalAuthguard)
  @Post('login')
  login(): any {
    return {};
  }

  @Get('protected')
  getHello(): string {
    return this.appService.getHello();
  }
}
