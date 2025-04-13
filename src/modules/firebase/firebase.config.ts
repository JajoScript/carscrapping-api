import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';
import { env } from '@/config';

const serviceAccount: ServiceAccount = {
  projectId: env.FIREBASE_PROJECT_ID,
  privateKey: env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  clientEmail: env.FIREBASE_CLIENT_EMAIL,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const firestore = admin.firestore();
