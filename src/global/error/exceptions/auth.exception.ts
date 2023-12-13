import { BaseException } from './base.exception';
import { HttpStatus } from '@nestjs/common';
import { AuthExceptionEnum } from '../enums/exception-code.enum';

export class InvalidVerificationCodeException extends BaseException {
  constructor() {
    super(
      HttpStatus.UNAUTHORIZED,
      AuthExceptionEnum.InvalidCode,
      'Wrong verification code',
    );
  }
}
