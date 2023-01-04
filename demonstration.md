# Tilt and NestJS


A revisited presention of Tilt  

# Table of content
* Tilt general overview
* My implementation
* Future of Tilt
* NestJS 
* NestJS modules
* Current Implementation of Express
* Why it will work
* References

--- 
# Tilt

Starting your dev environment should be simple, consistent, configurable and inline with productions endpoints. 

## Problems it solves:
* The high number of terminal per service which is usually handled by a `terminal multiplexer`;
* no warnings, when tests are failing;
* unless using something like `tmuxinator` to create a repeatable `.yaml` file;
* no central log console;
* easy toggling of resources

## Major advantages:
* programmable by using [Starlark](https://github.com/bazelbuild/starlark);
* Supports kubernetes, kustomize, helm, docker, and docker-compose;

## Disadvantages:
* Requires workaround at times.
* Documentation isn't great
* Sometimes you have to purge Docker containers

---
# My Implementation
* localhost/infrastructure mode
* liveness probe check
* testing

## Demonstration


## Other implementations
* Using [Docker-compose](https://docs.tilt.dev/docker_compose.html) no major refactor needed for codebase.

---
# Future

Tilt open-source support is ongoing and docker [supports](https://www.docker.com/blog/welcome-tilt-fixing-the-pains-of-microservice-development-for-kubernetes/) the team.

---
# NestJS

Quick orientation to the folder structure. It generally follows the service, controller, module pattern. Each directory is a service. 
```
on ⛵ kind-infrastructure-website  nextjs-nestjs/backend/src on  main [$!?] via  v19.3.0 on ☁️  atreides-build (eu-west-1) 
❯ ls
.rw-r--r-- 1.3k henri 31 Dec  2022 app.controller.ts
.rw-r--r-- 1.3k henri  3 Jan 11:59 app.module.ts
.rw-r--r--  364 henri 31 Dec  2022 app.service.ts
drwxr-xr-x    - henri 19 Dec  2022 auth
drwxr-xr-x    - henri 18 Dec  2022 common
.rw-r--r-- 1.3k henri  2 Jan 09:20 main.ts
drwxr-xr-x    - henri 17 Dec  2022 scripts
drwxr-xr-x    - henri  6 Dec  2022 shared
drwxr-xr-x    - henri 18 Dec  2022 supporters
```
A service using the same pattern
```
on ⛵ kind-infrastructure-website  backend/src/supporters on  main [$!?] via  v19.3.0 on ☁️  atreides-build (eu-west-1) 
❯ ls
drwxr-xr-x    - henri 18 Dec  2022 dto
drwxr-xr-x    - henri 19 Dec  2022 entities
drwxr-xr-x    - henri 18 Dec  2022 interfaces
drwxr-xr-x    - henri 18 Dec  2022 mock-data
drwxr-xr-x    - henri 18 Dec  2022 schema
.rw-r--r-- 1.7k henri 19 Dec  2022 supporters.controller.spec.ts
.rw-r--r-- 3.0k henri 31 Dec  2022 supporters.controller.ts
.rw-r--r--  453 henri 18 Dec  2022 supporters.module.ts
.rw-r--r-- 1.5k henri 19 Dec  2022 supporters.service.spec.ts
.rw-r--r-- 2.2k henri  3 Jan 11:31 supporters.service.ts
```

---
# NestJS modules
## Express/Fastify
`NestJS` is a wrapper around either `expressJS` or `fastify` and can take advantages of either system. 
* Current configuration is running `fastify` through `@nestjs/platform-fastify`
## Logger
We can improve the default logger using `nestjs-pino` which wraps around the [pino library](https://github.com/pinojs/pino) and produces excellent logs
## Env control
Can be granural thanks to `ConfigService`
```ts
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
```
## Postgres
PostgreSQL db is easily integrated through `@nestjs/typeorm` which can handle the following:

* DB connection
* Table creation
* Injection into `*.service.ts` file

## Swagger 
* init
* documenting controllers
* documenting inputs
---
# Please bear with me for the next few slides

Very brief overview of the code structure
---
## DB: Connection to the postgresdb

```ts
// typeorm.service.ts
import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  @Inject(ConfigService)
  private readonly configService: ConfigService;

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get<string>('DATABASE_HOST'),
      port: this.configService.get<number>('DATABASE_PORT'),
      database: this.configService.get<string>('DATABASE_NAME'),
      username: this.configService.get<string>('DATABASE_USER'),
      password: this.configService.get<string>('DATABASE_PASSWORD'),
      entities: ['dist/**/*.entity.{ts,js}'],
      migrations: ['dist/migrations/*.{ts,js}'],
      migrationsTableName: 'typeorm_migrations',
      logger: 'file',
      synchronize: true, // never use TRUE in production!
    };
  }
}
```
---
## DB: Table creation based on class
```ts
// supporter.entity.ts
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SupporterEntity extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column('varchar')
  name: string;

  @ApiProperty()
  @Column('varchar')
  username: string;

  @ApiProperty()
  @Column('varchar')
  password: string;

  constructor(name?: string, username?: string, password?: string) {
    super();
    this.name = name || '';
    this.username = username || '';
    this.password = password || '';
  }
}
```
---
## DB: Injection
```ts

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
//[...]
//supporters.service.ts
@Injectable()
export class SupportersService {
  constructor(
    @InjectRepository(SupporterEntity)
    private supporterRepository: Repository<SupporterEntity>,
  ) {}
  private readonly logger = new Logger('Supporter');

  async create(
    createSupporterDto: CreateSupporterDto,
  ): Promise<SupporterInterface | undefined> {
    const supporter = new SupporterEntity();
    supporter.id = 69;
    supporter.name = createSupporterDto.name;
    supporter.password = createSupporterDto.password;
    supporter.username = createSupporterDto.username;
    this.logger.log(`LOGGER ${JSON.stringify(supporter)}`);
    return await this.supporterRepository.save({ ...supporter });
  }

//[...] 
```
---
## Swagger: init
```ts
//main.ts
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

//[...]
  // Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Nestjs-Nextjs backend template')
    .setDescription('Contains logger, jwt, passport, db')
    .setVersion('1.0')
    .addTag('template')

    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);
```
---
## Swagger: Controller decorator
```ts
@ApiTags('supporters')
@Controller('supporters')
export class SupportersController {
  constructor(private readonly supportersService: SupportersService) {}

  @ApiOperation({ summary: 'Add a new user/supporter' })
  @ApiCreatedResponse({
    description: 'Created Succesfully',
    type: SupporterEntity,
  })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiBody({ description: 'creates new supporter', type: CreateSupporterDto })
  @Post()
  create(@Body() createSupporterDto: CreateSupporterDto) {
    return this.supportersService.create(createSupporterDto);
  }
```
---
## Swagger: Data Transfer Object (DTO)
What makes it great is the usage of `class-validator` to double check the input.
```ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateSupporterDto {
  @ApiProperty({
    type: String,
    required: true,
  })
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  @IsString()
  username: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  @IsString()
  password: string;
}
```


---
# References

* [Tilt](https://tilt.dev/)
* [NestJS](https://docs.nestjs.com/)
