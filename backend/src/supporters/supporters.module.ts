import { Module } from '@nestjs/common';
import { SupportersService } from './supporters.service';
import { SupportersController } from './supporters.controller';
import { SupporterEntity } from './entities/supporter.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([SupporterEntity])],
  controllers: [SupportersController],
  providers: [SupportersService],
})
export class SupportersModule {}
