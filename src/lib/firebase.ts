
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc, initializeFirestore } from "firebase/firestore";
import { PortfolioData } from "./types";

const firebaseConfig = {
    apiKey: "AIzaSyDafOr9Oy3atUuvnTc3YkgS6pr7raoiI7Y",
    authDomain: "tracein-0.firebaseapp.com",
    projectId: "tracein-0"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

const portfolioDocRef = doc(db, "portfolio", "data");

export const getPortfolioData = async (): Promise<PortfolioData | null> => {
  try {
    const docSnap = await getDoc(portfolioDocRef);
    if (docSnap.exists()) {
      return docSnap.data() as PortfolioData;
    } else {
      console.log("No such document in Firestore, will use initial data.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching portfolio data from Firestore:", error);
    return null;
  }
};

export const savePortfolioData = async (data: PortfolioData): Promise<void> => {
  try {
    await setDoc(portfolioDocRef, data, { merge: true });
  } catch (error) {
    console.error("Error saving portfolio data to Firestore:", error);
  }
};
