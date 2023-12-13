import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Role } from './Roles.enum';
import { InvalidVerificationCodeException } from '../global/error/exceptions/auth.exceptions';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly firebaseService: FirebaseService,
  ) {}

  async getTokenByCode(code: string) {
    const { code: verificationCode } = await this.firebaseService.getOne(
      'codes',
      'verification',
    );
    if (verificationCode != code) {
      throw new InvalidVerificationCodeException();
    }
    return await this.createToken();
  }

  async createToken() {
    const payload = { role: Role.JOON };
    const accessToken = await this.jwtService.signAsync(payload);
    return { accessToken };
  }
}
