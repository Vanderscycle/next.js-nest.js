import { Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { AppService } from "./app.service";
import { LocalAuthguard } from "./auth/local-auth.guard";
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(LocalAuthguard)
  @Post("login")
  login(@Request() req): any {
    console.log(req);
    return req.username;
  }

  @Get("protected")
  getHello(): string {
    return this.appService.getHello();
  }
}
