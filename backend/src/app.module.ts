import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectApiModule } from './project-api/project-api.module';
import { PostgresModule } from './postgres/postgres.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ProjectApiModule,
    PostgresModule,
    ConfigModule.forRoot({ envFilePath: '.env-example', isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
