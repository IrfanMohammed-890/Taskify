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
  serverTimestamp,
  addDoc,
} from "firebase/firestore";

/**
 * @param {number} pageSize - Number of items to fetch
 * @param {QueryDocumentSnapshot} lastDoc - Last document from previous page (for pagination)
 * @param {string} searchTerm - Optional location_name search term
 */

interface PaymentData {

}

export const fetchPaymentList = async (
  pageSize = 10,
  lastDoc: QueryDocumentSnapshot<DocumentData> | null = null,
  searchTerm: string = ""
) => {
  try {
    const collectionRef = collection(db, "payment"); // Assuming this is the correct collection now
    let q = query(collectionRef, orderBy("createdAt", "desc"), limit(50)); // fetch more to enable client-side filtering

    if (lastDoc) {
      q = query(q, startAfter(lastDoc));
    }

    const snapshot = await getDocs(q);

    let payments = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Client-side filter for search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      payments = payments.filter((payment: any) =>
      (payment.firstName?.toLowerCase().includes(term) ||
        payment.lastName?.toLowerCase().includes(term) ||
        payment.email?.toLowerCase().includes(term))
      );
    }

    // Optional: only return up to `pageSize`
    const filtered = payments.slice(0, pageSize);
    const newLastDoc = snapshot.docs[snapshot.docs.length - 1] || null;

    return {
      data: filtered,
      lastDoc: newLastDoc,
    };
  } catch (error) {
    console.error("Error fetching payments:", error);
    throw error;
  }
};


export const createPayment = async (data: any) => {
  try {
    await addDoc(collection(db, 'payment'), {
      planId: data.planId,
      userId: data.userId,
      duration: data.duration,
      amount: data.price,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      planName: data.planName,
      createdAt: serverTimestamp(),
    });
  } catch (error: any) {
    console.error('Firestore Error on payment:', error.message);
    throw new Error(error.message || 'Failed to create payment');
  }
};


export const updatePayment = async (id: string, data: any) => {
  try {
    const docRef = doc(db, 'payment', id);
    await updateDoc(docRef, {
      meditationName: data.meditationName,
      description: data.description,
      steps: data.steps.map((s: any) => s.step),
      isPaid: data.isPaid || false,
      locationId: data.locationId || '',
      updatedAt: new Date(),
    });
  } catch (error: any) {
    console.error('Firestore Error:', error.message);
    throw new Error(error.message || 'Failed to update payment');
  }
};


export const deletePayment = async (id: string) => {
  try {
    const docRef = doc(db, 'payment', id);
    await deleteDoc(docRef);
  } catch (error) {
    throw error;
  }
};

export const getPaymentById = async (id: string) => {
  try {
    const docRef = doc(db, 'payment', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      throw new Error('Payment not found');
    }
  } catch (error) {
    console.error('Error fetching payment:', error);
    throw error;
  }
};