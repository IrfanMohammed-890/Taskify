// authService.ts
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";

// Sign Up
export const signUp = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error: any) {
    console.log('error in service', error.code);
    throw error;
  }
};

// Login
export const login = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error: any) {
    throw error;
  }
};

//check email exist or not and user type
export const checkUser = async (email: string) => {
  try {
    const usersRef = collection(db, 'users'); // Use your collection name here
    const q = query(usersRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const userData = querySnapshot.docs[0].data(); // Get the first matching user
      return userData;
    } else {
      return null;
    }
  } catch (error: any) {
    throw error;
  }
};
export const getUserDataFromFirestore = async (uid: string) => {
  const docRef = doc(db, 'users', uid);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    throw new Error('User data not found in Firestore');
  }
  return docSnap.data();
};
