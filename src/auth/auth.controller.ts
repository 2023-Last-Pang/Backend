import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('/api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/verify')
  async verify() {
    return await this.authService.createToken();
  }
}
