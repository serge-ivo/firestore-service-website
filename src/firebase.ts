import { initializeApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";
// Remove analytics import if you're not using it
// import { getAnalytics } from "firebase/analytics";
import { FirestoreService } from "@serge-ivo/firestore-client"; // Import the service

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firestore instance
export const db: Firestore = getFirestore(app);

// Create and export a single FirestoreService instance
export const firestoreService = new FirestoreService(db);

// Commenting out unused analytics initialization
// const analytics = getAnalytics(app);
