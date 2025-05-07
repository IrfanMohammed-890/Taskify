// firebase.js
// import { initializeApp } from 'firebase/app';
// import { getAuth } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore';

// const firebaseConfig = {
//   apiKey: 'YOUR_API_KEY',
//   authDomain: 'your-app.firebaseapp.com',
//   projectId: "safespace-2eee7",
//   storageBucket: 'your-app.appspot.com',
//   messagingSenderId: 'YOUR_MSG_SENDER_ID',
//   appId: 'YOUR_APP_ID',
// };

// const app = initializeApp(firebaseConfig);



// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
// export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);