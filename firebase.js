import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyAZ-lmkPJC6XkV3ZGbrV-dAPrWwrmwb47M",
  authDomain: "safespace-2eee7.firebaseapp.com",
  projectId: "safespace-2eee7",
  storageBucket: "safespace-2eee7.firebasestorage.app",
  messagingSenderId: "261224056769",
  appId: "1:261224056769:web:450f1ac70bdf3d48d15140",
  measurementId: "G-7Q8GR6PY8B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with AsyncStorage persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Initialize Firestore
const db = getFirestore(app);

// Export initialized services
export { app, auth, db };