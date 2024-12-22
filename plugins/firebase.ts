import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, initializeFirestore, CACHE_SIZE_UNLIMITED } from 'firebase/firestore';
import { defineNuxtPlugin, useRuntimeConfig } from '#app';

let auth: ReturnType<typeof getAuth>;
let db: ReturnType<typeof getFirestore>;

export default defineNuxtPlugin((nuxtApp) => {
  console.log('Firebase plugin loaded');

  const config = useRuntimeConfig();

  console.log('Runtime config:', config);

  const firebaseConfig = {
    apiKey: config.public.FIREBASE_API_KEY as string,
    authDomain: config.public.FIREBASE_AUTH_DOMAIN as string,
    projectId: config.public.FIREBASE_PROJECT_ID as string,
    storageBucket: config.public.FIREBASE_STORAGE_BUCKET as string,
    messagingSenderId: config.public.FIREBASE_MESSAGING_SENDER_ID as string,
    appId: config.public.FIREBASE_APP_ID as string,
    measurementId: config.public.FIREBASE_MEASUREMENT_ID as string
  };

  // Initialize Firebase
  console.log('Initializing Firebase with config:', firebaseConfig);
  const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  auth = getAuth(app);
  db = !getApps().length ? initializeFirestore(app, { cacheSizeBytes: CACHE_SIZE_UNLIMITED }) : getFirestore(app);

  // Set persistence
  setPersistence(auth, browserLocalPersistence)
    .then(() => {
      console.log('Firebase persistence set to LOCAL');
    })
    .catch((error) => {
      console.error('Error setting Firebase persistence:', error);
    });

  nuxtApp.provide('auth', auth);
  nuxtApp.provide('db', db);
});

export { auth, db, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword };