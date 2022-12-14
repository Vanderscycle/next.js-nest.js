import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
// import { AuthenticatedGuard } from './auth/authenticated.guard';
import { JwtAuthguard } from './auth/jwt-auth.guard';
// import { LoginDto } from './auth/dto/login.dto';
import { LocalAuthguard } from './auth/local-auth.guard';

@ApiTags('app')
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(LocalAuthguard)
  @Post('login')
  async login(@Request() req: any) {
    return this.authService.login(req.user);
    // return { msg: 'Logged in' }; //TODO: return JWT access token
  }

  // @UseGuards(AuthenticatedGuard)
  @UseGuards(JwtAuthguard)
  @Get('protected')
  getHello(): string {
    return this.appService.getHello(); //TODO: require the token and a valid token
  }

  @ApiOperation({ summary: 'Delete one user/supporter' })
  @ApiOkResponse({
    description: 'The version was returned successfully',
    type: String,
  })
  @Get('version')
  getVersion(): string {
    return this.appService.getVersion();
  }
}
