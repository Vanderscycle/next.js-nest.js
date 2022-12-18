import { Module } from '@nestjs/common';
import { SupportersService } from './supporters.service';
import { SupportersController } from './supporters.controller';

@Module({
  controllers: [SupportersController],
  providers: [SupportersService],
})
export class SupportersModule {}
