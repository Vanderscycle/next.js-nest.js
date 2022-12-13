import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthenticatedGuard } from './auth/authenticated.guard';
import { LoginDto } from './auth/dto/login.dto';
import { LocalAuthguard } from './auth/local-auth.guard';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(LocalAuthguard)
  @Post('login')
  async login(@Request() req: any) {
    return { msg: 'Logged in' }; //TODO: return JWT access token
  }

  // @UseGuards(AuthenticatedGuard)
  @Get('protected')
  getHello(): string {
    return this.appService.getHello(); //TODO: require the token and a valid token
  }
}
