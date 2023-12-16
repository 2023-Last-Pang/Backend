import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import {
  BaseException,
  UnCatchedException,
} from '../error/exceptions/base.exception';
import { ValidationException } from '../error/exceptions/validation.exception';

// validation Exception 캐치
@Catch(ValidationException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: ValidationException, host: ArgumentsHost): void {
    console.log('validation exception occurred');

    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    response.status(HttpStatus.BAD_REQUEST).json({
      statusCode: exception.statusCode,
      errors: exception.errors.map((error) => {
        return {
          property: error.property,
          constraints: error.constraints,
        };
      }),
      timestamp: new Date(),
      path: request.url,
    });
  }
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp(); // Exception Filter가 Http요청 외에도 동작하므로 필요
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    response.status(exception.getStatus()).json({
      statusCode: exception.getStatus(),
      message: exception.message,
      timestamp: new Date(),
      path: request.url,
    });
  }
}

// 전역 Exception 캐치
@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: Error, host: ArgumentsHost): void {
    console.log(exception);

    const ctx = host.switchToHttp(); // Exception Filter가 Http요청 외에도 동작하므로 필요
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    const res =
      exception instanceof BaseException ? exception : new UnCatchedException();

    if (exception instanceof BaseException) {
      // Custom Error Response 정의
      response.status(res.statusCode).json({
        statusCode: res.statusCode,
        errorCode: res.errorCode,
        message: res.message,
        timestamp: new Date(),
        path: request.url,
      });
    }
  }
}
