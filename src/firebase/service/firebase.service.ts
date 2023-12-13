import { Injectable, Logger } from '@nestjs/common';
import * as admin from 'firebase-admin';
import serviceAccount from '../firebase-adminsdk.json';

@Injectable()
export class FirebaseService {
  public db: admin.firestore.Firestore;
  private readonly logger = new Logger(FirebaseService.name);

  constructor() {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    });

    this.db = admin.firestore();
  }

  async insert(collection: string, data: object) {
    try {
      const docRef = this.db.collection(collection).doc();
      const docRes = await docRef.set(
        {
          ...data,
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        },
        { merge: true },
      );

      return docRef.id;
    } catch (e) {
      console.log(e);
    }
  }

  async getOne(collection: string, id: string) {
    const docRef = this.db.collection(collection).doc(id);
    const doc = await docRef.get();
    if (!doc.exists) {
      this.logger.warn('No such document!');
    }
    return doc.data();
  }
}
