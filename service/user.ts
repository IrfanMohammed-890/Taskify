import { db } from "@/firebase";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  startAfter,
  where,
  QueryDocumentSnapshot,
  DocumentData,
  doc,
  deleteDoc,
  setDoc,
  updateDoc,
  getDoc,
} from "firebase/firestore";

/**
 * @param {number} pageSize - Number of items to fetch
 * @param {QueryDocumentSnapshot} lastDoc - Last document from previous page (for pagination)
 * @param {string} searchTerm - Optional location_name search term
 */

interface UsersData {

}
export const fetchUsers = async (
  pageSize = 10,
  lastDoc: QueryDocumentSnapshot<DocumentData> | null = null,
  searchTerm: string = ""
) => {
  try {
    const collectionRef = collection(db, "users");

    if (searchTerm) {
      const q1 = query(
        collectionRef,
        orderBy("firstName"),
        where("firstName", ">=", searchTerm),
        where("firstName", "<=", searchTerm + "\uf8ff"),
        limit(pageSize)
      );

      const q2 = query(
        collectionRef,
        orderBy("lastName"),
        where("lastName", ">=", searchTerm),
        where("lastName", "<=", searchTerm + "\uf8ff"),
        limit(pageSize)
      );

      const q3 = query(
        collectionRef,
        orderBy("email"),
        where("email", ">=", searchTerm),
        where("email", "<=", searchTerm + "\uf8ff"),
        limit(pageSize)
      );

      const [snap1, snap2, snap3] = await Promise.all([
        getDocs(q1),
        getDocs(q2),
        getDocs(q3),
      ]);

      const mergedDocs = [...snap1.docs, ...snap2.docs, ...snap3.docs];
      const uniqueDocsMap = new Map();

      mergedDocs.forEach((doc) => {
        uniqueDocsMap.set(doc.id, { id: doc.id, ...doc.data() });
      });

      const users = Array.from(uniqueDocsMap.values()).slice(0, pageSize);

      return {
        data: users,
        lastDoc: null,
      };
    } else {
      let q = query(collectionRef, orderBy("createdAt", "desc"), limit(pageSize));
      if (lastDoc) {
        q = query(q, startAfter(lastDoc));
      }

      const snapshot = await getDocs(q);
      const users = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      const newLastDoc = snapshot.docs[snapshot.docs.length - 1] || null;

      return {
        data: users,
        lastDoc: newLastDoc,
      };
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const deleteUser = async (id: string) => {
  try {
    const docRef = doc(db, 'users', id);
    await deleteDoc(docRef);
  } catch (error) {
    throw error;
  }
};

export const createUser = async (userInfo: any) => {
  try {
    await setDoc(doc(db, 'users', userInfo.uid), {
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      email: userInfo.email,
      contactNumber: userInfo.contactNumber,
      createdAt: new Date(),
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getUserById = async (id: string) => {
  try {
    const docRef = doc(db, 'users', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      throw new Error('User not found');
    }
  } catch (error: any) {
    console.error('Error fetching user by ID:', error.message);
    throw new Error('Failed to fetch user data');
  }
};