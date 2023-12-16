import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { VerifyCodeDto } from '../dto/code-verify.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('AUTH')
@Controller('/api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: '인증코드로 토큰 발급' })
  @Post('/verify')
  async verify(@Body() verifyCodeDto: VerifyCodeDto) {
    return await this.authService.getTokenByCode(verifyCodeDto.code);
  }
}
