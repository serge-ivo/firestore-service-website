import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, Firestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-Zzci1e3Wudfg36ZoBdUEEC3evSkSQIE",
  authDomain: "firestore-service-website.firebaseapp.com",
  projectId: "firestore-service-website",
  storageBucket: "firestore-service-website.firebasestorage.app",
  messagingSenderId: "891659870829",
  appId: "1:891659870829:web:50dd900aab03f000675564",
  measurementId: "G-M2H5YBJS85",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db: Firestore = getFirestore(app);
