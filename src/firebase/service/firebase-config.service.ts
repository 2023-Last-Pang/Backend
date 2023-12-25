import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FirebaseConfigService {
  constructor(private configService: ConfigService) {}

  get firebaseConfig() {
    return {
      type: this.configService.get<string>('FIREBASE_ADMIN_SDK_TYPE'),
      projectId: this.configService.get<string>(
        'FIREBASE_ADMIN_SDK_PROJECT_ID',
      ),
      privateKeyId: this.configService.get<string>(
        'FIREBASE_ADMIN_SDK_PRIVATE_KEY_ID',
      ),
      privateKey: this.configService
        .get<string>('FIREBASE_ADMIN_SDK_PRIVATE_KEY')
        .replace(/\\n/g, '\n'),
      clientEmail: this.configService.get<string>(
        'FIREBASE_ADMIN_SDK_CLIENT_EMAIL',
      ),
      clientId: this.configService.get<string>('FIREBASE_ADMIN_SDK_CLIENT_ID'),
      authUri: this.configService.get<string>('FIREBASE_ADMIN_SDK_AUTH_URI'),
      tokenUri: this.configService.get<string>('FIREBASE_ADMIN_SDK_TOKEN_URI'),
      authProviderX509CertUrl: this.configService.get<string>(
        'FIREBASE_ADMIN_SDK_AUTH_PROVIDER_X509_CERT_URL',
      ),
      clientX509CertUrl: this.configService.get<string>(
        'FIREBASE_ADMIN_SDK_CLIENT_X509_CERT_URL',
      ),
    };
  }
}
