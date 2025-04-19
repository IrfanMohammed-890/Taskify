
import { initializeApp } from 'firebase/app';
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqTLnCdJmXD7l1Y7JRbUgSn4M_28sP7zQ",
  authDomain: "taskify-a71cb.firebaseapp.com",
  projectId: "taskify-a71cb",
  storageBucket: "taskify-a71cb.firebasestorage.app",
  messagingSenderId: "734266286267",
  appId: "1:734266286267:web:b03a49d8fac8d44ad5899e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Get and export firebase Auth
const auth = getAuth(app);
export {auth};