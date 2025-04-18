import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';
import { env } from '@/config';
import { Firestore } from 'firebase-admin/firestore';
import { Auth } from 'firebase-admin/auth';

const serviceAccount: ServiceAccount = {
  clientEmail: env.FIREBASE_CLIENT_EMAIL,
  projectId: env.FIREBASE_PROJECT_ID,
  privateKey: env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: env.FIREBASE_DATABASE_URL,
});

export const firestore: Firestore = admin.firestore();
export const auth: Auth = admin.auth();
