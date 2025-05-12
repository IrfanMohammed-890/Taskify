import { db } from "@/firebase";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";


export const fetchUserStats = async () => {
  try {
    const q = query(collection(db, "users"), where("isAdmin", "==", false));
    const querySnapshot = await getDocs(q);

    let total = 0;
    let paid = 0;
    let unpaid = 0;

    querySnapshot.forEach((doc) => {
      total++;
      const user = doc.data();
      if (user.isMember === true) {
        paid++;
      } else if (user.isMember === false) {
        unpaid++;
      }
    });

    return {
      totalUsers: total,
      paidUsers: paid,
      unpaidUsers: unpaid,
    };
  } catch (error: any) {
    console.error("Error fetching user stats:", error);
    return {
      totalUsers: 0,
      paidUsers: 0,
      unpaidUsers: 0,
    };
  }
};




/**
 * Sum all the `amount` from `payment` table
 */
export const fetchTotalPaymentAmount = async () => {
  try {
    const q = query(collection(db, "payment"));
    const querySnapshot = await getDocs(q);

    let total = 0;
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      console.log("Payment Data:", data); // Debug log
      if (data.amount && typeof data.amount === "string") {
        const amount = Number(data.amount);
        if (!isNaN(amount)) {
          total += amount;
        } else {
          console.warn("Invalid amount string:", data.amount);
        }
      }

    });


    return total;
  } catch (error: any) {
    console.error("Error fetching total payment amount:", error);
    return 0;
  }
};

/**
 * Get total count from `consultant` table
 */
export const totalConsultantCount = async () => {
  try {
    const q = query(collection(db, "consultant"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.size;
  } catch (error: any) {
    console.error("Error fetching consultant count:", error);
    return 0;
  }
};
