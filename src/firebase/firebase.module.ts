import { Module } from '@nestjs/common';
import { FirebaseService } from './service/firebase.service';
import { ConfigModule } from '@nestjs/config';
import { FirebaseConfigService } from './service/firebase-config.service';

@Module({
  imports: [ConfigModule],
  providers: [FirebaseService, FirebaseConfigService],
  exports: [FirebaseService],
})
export class FirebaseModule {}
