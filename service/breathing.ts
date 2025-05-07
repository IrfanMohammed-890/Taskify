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
} from "firebase/firestore";

/**
 * @param {number} pageSize - Number of items to fetch
 * @param {QueryDocumentSnapshot} lastDoc - Last document from previous page (for pagination)
 * @param {string} searchTerm - Optional location_name search term
 **/

interface BreathingData {

}

export const fetchBreathingList = async (
  pageSize = 10,
  lastDoc: QueryDocumentSnapshot<DocumentData> | null = null,
  searchTerm: string = ""
) => {
  try {
    const collectionRef = collection(db, "breathings");
    let q;

    if (searchTerm) {
      // Firestore doesn't support partial string matching, so only exact matches or filtering via indexing
      q = query(
        collectionRef,
        where("breathingName", ">=", searchTerm),
        where("breathingName", "<=", searchTerm + "\uf8ff"),
        orderBy("breathingName"),
        limit(pageSize)
      );
    } else {
      q = query(
        collectionRef,
        orderBy("createdAt", 'desc'),
        limit(pageSize)
      );
    }

    if (lastDoc) {
      q = query(q, startAfter(lastDoc));
    }

    const snapshot = await getDocs(q);
    const breathings = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    const newLastDoc = snapshot.docs[snapshot.docs.length - 1] || null;

    return {
      data: breathings,
      lastDoc: newLastDoc, // Store this to fetch next page
    };
  } catch (error) {
    console.error("Error fetching breathing:", error);
    throw error;
  }
};

export const createBreathing = async (data: any) => {
  try {
    await setDoc(doc(db, 'breathings', Date.now().toString()), {
      breathingName: data.breathingName,
      description: data.description,
      steps: data.steps.map((s: any) => s.step),
      isPaid: data.isPaid || false,
      createdAt: new Date(),
    });
  } catch (error: any) {
    console.error('Firestore Error:', error.message);
    throw new Error(error.message || 'Failed to create breathing');
  }
};


export const updateBreathing = async (id: string, data: any) => {
  try {
    const docRef = doc(db, 'breathings', id);
    await updateDoc(docRef, {
      breathingName: data.breathingName,
      description: data.description,
      steps: data.steps.map((s: any) => s.step),
      isPaid: data.isPaid || false,
      updatedAt: new Date()
    });
  } catch (error: any) {
    console.error('Firestore Error:', error.message);
    throw new Error(error.message || 'Failed to update breathing');
  }
};


export const deleteBreathing = async (id: string) => {
  try {
    const docRef = doc(db, 'breathings', id);
    await deleteDoc(docRef);
  } catch (error) {
    throw error;
  }
};