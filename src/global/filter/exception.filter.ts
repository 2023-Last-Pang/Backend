import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import {
  BaseException,
  UnCatchedException,
} from '../error/exceptions/base.exception';

@Catch() // 전역 Exception 캐치
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp(); // Exception Filter가 Http요청 외에도 동작하므로 필요
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    const res =
      exception instanceof BaseException ? exception : new UnCatchedException();

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
