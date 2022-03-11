import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/');

  const configService = app.get(ConfigService);

  app.connectMicroservice<MicroserviceOptions>(
    {
      transport: Transport.GRPC,
      options: {
        package: configService.get<string>('PROTO_USER_PACKAGE'),
        protoPath: join(
          __dirname,
          configService.get<string>('PROTO_USER_PATH'),
        ),
        url: configService.get<string>('PROTO_USER_URL'),
      },
    },
    { inheritAppConfig: true },
  );
  const config = new DocumentBuilder()
    .setTitle('NestJs Demo Project')
    .setDescription('The Demo API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);
  await app.startAllMicroservices();
  await app.listen(configService.get<string>('PORT'));
}
bootstrap();
