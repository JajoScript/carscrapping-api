import { Module } from '@nestjs/common';
import { firestore, auth } from './firebase.config';

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: 'FIRESTORE',
      useValue: firestore,
    },
    {
      provide: 'FIREBASE_AUTH',
      useValue: auth,
    },
  ],
  exports: ['FIRESTORE', 'FIREBASE_AUTH'],
})
export class FirebaseModule {}
