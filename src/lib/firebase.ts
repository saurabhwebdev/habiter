// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDuQpVPUtsqgxfmpmocAP-0rHgF5iXRE1M",
  authDomain: "yardms-307fe.firebaseapp.com",
  projectId: "yardms-307fe",
  storageBucket: "yardms-307fe.firebasestorage.app",
  messagingSenderId: "441228346993",
  appId: "1:441228346993:web:c42d7227bbdce155307dd0",
  measurementId: "G-9F84TJ98EC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const analytics = getAnalytics(app);
export const db = getFirestore(app);

export default app; 