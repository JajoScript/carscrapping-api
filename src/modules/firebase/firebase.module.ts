import { Module } from '@nestjs/common';
import { firestore } from './firebase.config';

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: 'FIRESTORE',
      useValue: firestore,
    },
  ],
  exports: ['FIRESTORE'],
})
export class FirebaseModule {}
