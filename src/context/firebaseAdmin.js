import admin from 'firebase-admin'
import serviceAccount from './serviceAccount.json'

export const firebaseAdmin = () => {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential : admin.credential.cert(serviceAccount),
    })
  }
}

