import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';
import { Firestore } from 'firebase-admin/firestore';
import { Auth } from 'firebase-admin/auth';

const serviceAccount: ServiceAccount = require('../../../firebase/service_account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const firestore: Firestore = admin.firestore();
export const auth: Auth = admin.auth();
