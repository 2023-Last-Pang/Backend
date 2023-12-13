import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import {
  GlobalExceptionFilter,
  ValidationExceptionFilter,
} from './global/filter/exception.filter';
import { ValidationException } from './global/error/exceptions/validation.exception';

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
    .addBearerAuth()
    .addTag('API')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 데코레이터 없는 속성 제거
      // forbidNonWhiteListed: true,
      transform: true, // 타입 변환
      exceptionFactory: (errors) => {
        throw new ValidationException(errors);
      },
    }),
  );
  app.useGlobalFilters(
    new GlobalExceptionFilter(),
    new ValidationExceptionFilter(),
  );
  await app.listen(8000);
}

bootstrap();
