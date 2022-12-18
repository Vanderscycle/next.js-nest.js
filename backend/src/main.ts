import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
// import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );
  const config: ConfigService = app.get(ConfigService);
  const port: number = config.get<number>('BASE_PORT');
  const url: string = config.get<string>('BASE_HOST');
  // console.log(port, url);
  // Logger
  app.useLogger(app.get(Logger));

  // Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Nestjs-Nextjs backend template')
    .setDescription('Contains logger, jwt, passport, db')
    .setVersion('1.0')
    .addTag('template')

    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  // app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  // Launch
  await app.listen(port, () => {
    console.log(`[WEB] 🚀 ${url}:${port}`);
  });
}
bootstrap();
