import { db } from "@/firebase";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  setDoc,
  Timestamp,
  limit
} from "firebase/firestore";
import dayjs from "dayjs";

/**
 * @param {number} pageSize - Number of items to fetch
 * @param {QueryDocumentSnapshot} lastDoc - Last document from previous page (for pagination)
 * @param {string} searchTerm - Optional location_name search term
 */


interface MoodData {
  mood: string;
  userId: string;
}

const getStartOfTodayTimestamp = (): Timestamp => {
  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return Timestamp.fromDate(startOfDay);
};

export const createMood = async (data: MoodData) => {
  try {
    const today = dayjs().format('YYYY-MM-DD');
    await setDoc(doc(db, "user_mode", Date.now().toString()), {
      userId: data.userId,
      mood: data.mood,
      date: today,
      createdAt: getStartOfTodayTimestamp(),
    });
  } catch (error: any) {
    console.error("Firestore Error:", error.message);
  }
};


export const getTodayMood = async (
  userId: string
): Promise<{ moodSelection: boolean; }> => {
  try {
    const today = dayjs().format('YYYY-MM-DD');
    const q = query(
      collection(db, 'user_mode'),
      where('userId', '==', userId),
      where('date', '==', today)
    );

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      return { moodSelection: false };
    } else {
      return { moodSelection: true };
    }
  } catch (error) {
    console.error("Error checking today's mood:", error);
    return { moodSelection: true };
  }
};
