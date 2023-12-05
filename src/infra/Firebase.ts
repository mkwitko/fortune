// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from 'firebase/app'

const FirebaseCredentials = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_PUBLIC_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

// Initialize Firebase
const firebaseApp =
  getApps().length === 0 ? initializeApp(FirebaseCredentials) : getApps()[0]

export default firebaseApp
