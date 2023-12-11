import { BaseException } from './base.exception';
import { HttpStatus } from '@nestjs/common';
import { MessageExceptionCodeEnum } from '../enums/exception-code.enum';

export class MessageNotFoundException extends BaseException {
  constructor() {
    super(
      HttpStatus.NOT_FOUND,
      MessageExceptionCodeEnum.NotFound,
      'Message Not Found',
    );
  }
}
