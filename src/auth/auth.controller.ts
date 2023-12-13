import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { VerifyCodeDto } from './dto/code-verify.dto';

@Controller('/api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/verify')
  async verify(@Body() verifyCodeDto: VerifyCodeDto) {
    return await this.authService.getTokenByCode(verifyCodeDto.code);
  }
}
