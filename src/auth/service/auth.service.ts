import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Role, toRoleEnum } from '../enums/Roles.enum';
import { InvalidVerificationCodeException } from '../../global/error/exceptions/auth.exception';
import { FirebaseService } from '../../firebase/service/firebase.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly firebaseService: FirebaseService,
  ) {}

  async getTokenByCode(code: string) {
    const validCodes = await this.firebaseService.getOne(
      'codes',
      'verification',
    );
    const role = this.matchRoleByCode(validCodes, code);
    return await this.createToken(role);
  }

  async createToken(role: Role) {
    const payload = { role };
    const accessToken = await this.jwtService.signAsync(payload);
    return { accessToken, role };
  }

  matchRoleByCode(validCodes: object, code: string): Role {
    for (const [role, validCode] of Object.entries(validCodes)) {
      if (validCode === code) {
        return toRoleEnum(role);
      }
    }
    throw new InvalidVerificationCodeException();
  }
}
