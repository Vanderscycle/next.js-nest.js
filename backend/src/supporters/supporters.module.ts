import { Module } from '@nestjs/common';
import { SupportersService } from './supporters.service';
import { SupportersController } from './supporters.controller';
import { Supporter } from './entities/supporter.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Supporter])],
  controllers: [SupportersController],
  providers: [SupportersService],
})
export class SupportersModule {}
