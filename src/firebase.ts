import { FirebaseOptions } from "firebase/app";
// Remove analytics import if you're not using it
// import { getAnalytics } from "firebase/analytics";
import { FirestoreService } from "@serge-ivo/firestore-client"; // Import the service

// Your web app's Firebase configuration
const firebaseConfig: FirebaseOptions = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize FirestoreService directly with the configuration
// FirestoreService now handles Firebase app initialization internally
export const firestoreService = new FirestoreService(firebaseConfig);

// The 'db' instance is no longer needed externally for the service
// export const db: Firestore = getFirestore(app); // Removed export

// Commenting out unused analytics initialization
// const analytics = getAnalytics(app);
