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

interface ConsultantData {

}

export const fetchConsultantList = async (
  pageSize = 10,
  lastDoc: QueryDocumentSnapshot<DocumentData> | null = null,
  searchTerm: string = ""
) => {
  try {
    const collectionRef = collection(db, "consultant");
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
    const consultants = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    const newLastDoc = snapshot.docs[snapshot.docs.length - 1] || null;

    return {
      data: consultants,
      lastDoc: newLastDoc, // Store this to fetch next page
    };
  } catch (error) {
    console.error("Error fetching consultants locations:", error);
    throw error;
  }
};

export const createConsultant = async (data: any) => {
  try {
    await setDoc(doc(db, 'consultant', Date.now().toString()), {
      name: data.name,
      education: data.education,
      contact: data.contact,
      email: data.email,
      days: data.days.map((d: any) => d.day), // Store selected days as string array
      createdAt: new Date(),
    });
  } catch (error: any) {
    console.error('Firestore Error:', error.message);
    throw new Error(error.message || 'Failed to create consultant');
  }
};



export const updateConsultant = async (id: string, data: any) => {
  try {
    const docRef = doc(db, 'consultant', id);
    await updateDoc(docRef, {
      name: data.name,
      education: data.education,
      contact: data.contact,
      email: data.email,
      days: data.days.map((d: any) => d.day),
      updatedAt: new Date(),
    });
  } catch (error: any) {
    console.error('Firestore Error:', error.message);
    throw new Error(error.message || 'Failed to update consultant');
  }
};

export const deleteConsultant = async (id: string) => {
  try {
    const docRef = doc(db, 'consultant', id);
    await deleteDoc(docRef);
  } catch (error) {
    throw error;
  }
};

export const getConsultantById = async (id: string) => {
  try {
    const docRef = doc(db, 'consultant', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      throw new Error('Consultant not found');
    }
  } catch (error) {
    console.error('Error fetching consultant:', error);
    throw error;
  }
};