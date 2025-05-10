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

interface RelaxSoundData {

}

export const fetchRelaxSoundList = async (
  pageSize = 10,
  lastDoc: QueryDocumentSnapshot<DocumentData> | null = null,
  searchTerm: string = ""
) => {
  try {
    const collectionRef = collection(db, "relax_sounds");
    let q;

    if (searchTerm) {
      // Firestore doesn't support partial string matching, so only exact matches or filtering via indexing
      q = query(
        collectionRef,
        where("name", ">=", searchTerm),
        where("name", "<=", searchTerm + "\uf8ff"),
        orderBy("name"),
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
    const relaxSounds = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    const newLastDoc = snapshot.docs[snapshot.docs.length - 1] || null;

    return {
      data: relaxSounds,
      lastDoc: newLastDoc, // Store this to fetch next page
    };
  } catch (error) {
    console.error("Error fetching relax sound:", error);
    throw error;
  }
};

export const createRelaxSound = async (data: any) => {
  try {
    await setDoc(doc(db, 'relax_sounds', Date.now().toString()), {
      name: data.name,
      description: data.description,
      link: data.link,
      isPaid: data.isPaid,
      createdAt: new Date(),
    });
  } catch (error: any) {
    console.error('Firestore Error:', error.message);
    throw new Error(error.message || 'Failed to create relax sound');
  }
};


export const updateRelaxSound = async (id: string, data: any) => {
  try {
    const docRef = doc(db, 'relax_sounds', id);
    await updateDoc(docRef, {
      name: data.name,
      description: data.description,
      link: data.link,
      isPaid: data.isPaid,
      updatedAt: new Date(),
    });
  } catch (error: any) {
    console.error('Firestore Error:', error.message);
    throw new Error(error.message || 'Failed to update relax sound');
  }
};


export const deleteRelaxSound = async (id: string) => {
  try {
    const docRef = doc(db, 'relax_sounds', id);
    await deleteDoc(docRef);
  } catch (error) {
    throw error;
  }
};

export const getRelaxSoundById = async (id: string) => {
  try {
    const docRef = doc(db, 'relax_sounds', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      throw new Error('Relax sound not found');
    }
  } catch (error) {
    console.error('Error fetching relax sound:', error);
    throw error;
  }
};