import { getApp, getApps, initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage"
import { getFirestore } from "firebase/firestore"

const app = !getApps().length ? initializeApp({
  apiKey: 'AIzaSyDvoQ6UsRck6aybSpJQGajnhxVq1zhIRDw',
  authDomain: "hakka-5f5e6.firebaseapp.com",
  projectId: "hakka-5f5e6",
  storageBucket: "hakka-5f5e6.appspot.com",
  messagingSenderId: "9844416811",
  appId: "1:9844416811:web:357e4bf5155dcdcf59256e",
  measurementId: "G-WMVKTGJRB9",
  databaseURL: 'https://hakka-5f5e6.firebaseio.com',
}) : getApp()
const auth = getAuth()
const storage = getStorage(app)
const db = getFirestore(app)

export { db, auth, storage }

