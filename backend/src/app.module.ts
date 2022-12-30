import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectApiModule } from './project-api/project-api.module';
import { ConfigModule } from '@nestjs/config';
import { getEnvPath } from './common/env.helper';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './shared/typeorm/typeorm.service';
// import { TypeOrmConfigService } from './shared/typeorm/typeorm.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SupportersModule } from './supporters/supporters.module';
import { LoggerModule } from 'nestjs-pino';

// const envFilePath: string = getEnvPath(`${__dirname}/common/envs`);
//
// const file = 'localhost';
const file = 'infrastructure';
//
console.log(process.env.NODE_ENV);
const envFilePath: string = getEnvPath(`${__dirname}/common/envs/${file}.env`);

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath, isGlobal: true }),
    LoggerModule.forRoot({
      pinoHttp: {
        customProps: (req, res) => ({
          context: 'HTTP',
        }),
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
          },
        },
      },
    }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    ProjectApiModule,
    UsersModule,
    AuthModule,
    SupportersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
