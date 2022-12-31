import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  @Inject(ConfigService)
  private readonly configService: ConfigService;

  getHello(): string {
    return 'Hello World!';
  }
  getVersion(): string {
    return this.configService.get<string>('BACKEND_VERSION');
  }
}
