import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Role } from './Roles.enum';
import { InvalidVerificationCodeException } from '../global/error/exceptions/auth.exceptions';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async getTokenByCode(token: string) {
    const tmpCode = 'TEST';
    if (tmpCode != token) {
      throw new InvalidVerificationCodeException();
    }
    return await this.createToken();
  }

  async createToken() {
    const payload = { role: Role.JOON };
    const accessToken = await this.jwtService.signAsync(payload);
    return { accessToken };
  }

  // async validate<T extends object>(token: string) {
  //   try {
  //     console.log(token);
  //     return await this.jwtService.verify<T>(token, {
  //       secret: 'testSecretKeyTestSecretKeyTestSecretKey',
  //     });
  //   } catch (e) {
  //     console.log(e);
  //     throw new UnauthorizedException();
  //   }
  // }
}
