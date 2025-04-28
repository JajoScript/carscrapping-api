import * as admin from 'firebase-admin';
import type { ServiceAccount } from 'firebase-admin';
import { Firestore } from 'firebase-admin/firestore';
import { Auth } from 'firebase-admin/auth';
import { env } from '@/config';

const serviceAccount: ServiceAccount = {
  clientEmail: env.FIREBASE_CLIENT_EMAIL,
  privateKey: env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  projectId: env.FIREBASE_PROJECT_ID,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const firestore: Firestore = admin.firestore();
export const auth: Auth = admin.auth();
