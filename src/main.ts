import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { GlobalExceptionFilter } from './global/filter/exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: true,
      methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
      preflightContinue: false,
      optionsSuccessStatus: 204,
      credentials: true,
    },
  });

  const options = new DocumentBuilder()
    .setTitle('last pang API')
    .setDescription('last pang API description')
    .setVersion('1.0')
    .addTag('API')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new GlobalExceptionFilter());
  await app.listen(8000);
}

bootstrap();
