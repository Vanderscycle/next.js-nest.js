import { Module } from '@nestjs/common';
import { Postgres } from './postgres.provider';

import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [Postgres],
})
export class PostgresModule {}
