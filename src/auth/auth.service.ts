import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async createToken() {
    const payload = { role: 'JOON' };
    return await this.jwtService.signAsync(payload);
  }
}
