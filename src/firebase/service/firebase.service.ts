import { Injectable, Logger } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { FirebaseConfigService } from './firebase-config.service';
import { MessagePaginationDto } from '../../message/dto/message-pagination.dto';

@Injectable()
export class FirebaseService {
  public db: admin.firestore.Firestore;
  private readonly logger = new Logger(FirebaseService.name);

  constructor(private firebaseConfigService: FirebaseConfigService) {
    const serviceAccount = this.firebaseConfigService.firebaseConfig;

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
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

  async getAll(collection: string, { page, limit }: MessagePaginationDto) {
    const docsRef = this.db.collection(collection);

    // const totalDocs = (await docsRef.get()).size;
    // const totalPage = Math.ceil(totalDocs / limit);

    const snapshot = await docsRef
      .orderBy('createdAt', 'desc')
      // .offset((page - 1) * limit)
      // .limit(limit)
      .get();

    const data = snapshot.docs.map((doc) => {
      const docData = doc.data();
      // createdAt 필드가 있는 경우에만 변환
      if (docData.createdAt) {
        const createdAtSeconds = docData.createdAt._seconds;
        const createdAtNanoseconds = docData.createdAt._nanoseconds;
        docData.createdAt = new Date(
          createdAtSeconds * 1000 + createdAtNanoseconds / 1000000,
        );
      }

      // updatedAt 필드가 있는 경우에만 변환
      if (docData.updatedAt) {
        const updatedAtSeconds = docData.updatedAt._seconds;
        const updatedAtNanoseconds = docData.updatedAt._nanoseconds;
        docData.updatedAt = new Date(
          updatedAtSeconds * 1000 + updatedAtNanoseconds / 1000000,
        );
      }

      return docData;
    });

    return {
      data,
      // limit,
      // page,
      // totalPage,
    };
  }
}
