import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import serviceAccount from './firebase-adminsdk.json';

@Injectable()
export class FirebaseService {
  public db: admin.firestore.Firestore;

  constructor() {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    });

    this.db = admin.firestore();
  }
}
