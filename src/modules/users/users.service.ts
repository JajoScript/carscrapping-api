import { HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { DocumentReference, Firestore } from 'firebase-admin/firestore';
import { CreateDTO } from './DTOs';
import APIError from '@/errors';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(@Inject('FIRESTORE') private readonly firestore: Firestore) {}

  // *-- Methods.
  async create(payload: CreateDTO) {
    const docRef: DocumentReference = await this.firestore
      .collection('users')
      .add(payload);
    await docRef.set({ userID: docRef.id }, { merge: true });

    return docRef.id;
  }

  async getByEmail(email: string) {
    const snapshot = await this.firestore
      .collection('users')
      .where('email', '==', email)
      .get();

    if (snapshot.empty)
      throw new APIError('User not found', HttpStatus.NOT_FOUND);

    const user = snapshot.docs[0].data();
    return user;
  }
}
