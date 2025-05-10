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
 */


interface LocationData {
  title: string;
  latitude: string | number;
  longitude: string | number;
}

export const fetchMeditationLocationList = async (
  pageSize = 10,
  lastDoc: QueryDocumentSnapshot<DocumentData> | null = null,
  searchTerm: string = ""
) => {
  try {
    const collectionRef = collection(db, "meditation_location");
    let q;

    if (searchTerm) {
      // Firestore doesn't support partial string matching, so only exact matches or filtering via indexing
      q = query(
        collectionRef,
        where("location_name", ">=", searchTerm),
        where("location_name", "<=", searchTerm + "\uf8ff"),
        orderBy("location_name"),
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
    const meditations = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    const newLastDoc = snapshot.docs[snapshot.docs.length - 1] || null;

    return {
      data: meditations,
      lastDoc: newLastDoc, // Store this to fetch next page
    };
  } catch (error) {
    console.error("Error fetching meditation locations:", error);
    throw error;
  }
};

export const createMeditationLocation = async (data: LocationData) => {
  try {
    await setDoc(doc(db, "meditation_location", Date.now().toString()), {
      location_name: data.title,
      lat: String(data.latitude),
      long: String(data.longitude),
      createdAt: new Date(),
    });
  } catch (error: any) {
    console.error("Firestore Error:", error.message);
  }
};


export const updateMeditationLocation = async (id: string, data: LocationData) => {
  try {
    const docRef = doc(db, "meditation_location", id);
    await updateDoc(docRef, {
      location_name: data.title,
      lat: parseFloat(String(data.latitude)),
      long: parseFloat(String(data.longitude)),
      updatedAt: new Date(),
    });
  } catch (error: any) {
    console.error("Firestore Error:", error.message);

  }
};

export const deleteMeditationLocation = async (id: string) => {
  try {
    const docRef = doc(db, 'meditation_location', id);
    await deleteDoc(docRef);
    console.log(`Deleted location with ID: ${id}`);
  } catch (error) {
    console.error("Error deleting meditation location:", error);
    throw error; // optional: rethrow for handling in UI
  }
};

//fetch list of location name and id
export const getMeditationLocationNamesList = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "meditation_location"));
    const locations = querySnapshot.docs.map(doc => ({
      id: doc.id,
      title: doc.data().location_name,
      latitude: doc.data().lat,
      longitude: doc.data().long
    }));
    return locations;
  } catch (error: any) {
    console.error("Firestore Error:", error.message);
    return [];
  }
};

