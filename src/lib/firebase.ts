
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadString, getDownloadURL } from "firebase/storage";
import { PortfolioData, AdminCredentials } from "./types";

const firebaseConfig = {
    apiKey: "AIzaSyDafOr9Oy3atUuvnTc3YkgS6pr7raoiI7Y",
    authDomain: "tracein-0.firebaseapp.com",
    projectId: "tracein-0"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const storage = getStorage(app);


const CLOUDINARY_UPLOAD_URL = "https://api.cloudinary.com/v1_1/dk3oumbuv/image/upload";
const CLOUDINARY_UPLOAD_PRESET = "tracein_preset";

const portfolioDocRef = doc(db, "portfolio", "data");
const adminDocRef = doc(db, "admin", "credentials");

export const getPortfolioData = async (): Promise<PortfolioData | null> => {
  try {
    const docSnap = await getDoc(portfolioDocRef);
    if (docSnap.exists()) {
      return docSnap.data() as PortfolioData;
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching portfolio data:", error);
    return null;
  }
};

export const savePortfolioData = async (data: PortfolioData): Promise<void> => {
  try {
    await setDoc(portfolioDocRef, data, { merge: true });
  } catch (error) {
    console.error("Error saving portfolio data:", error);
  }
};

export const getAdminCredentials = async (): Promise<AdminCredentials | null> => {
    try {
        const docSnap = await getDoc(adminDocRef);
        if (docSnap.exists()) {
            return docSnap.data() as AdminCredentials;
        } else {
            console.warn("Admin credentials document not found in Firestore.");
            return null;
        }
    } catch (error) {
        console.error("Error fetching admin credentials:", error);
        return null;
    }
}


export const uploadToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    try {
        const response = await fetch(CLOUDINARY_UPLOAD_URL, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Upload failed');
        }

        const data = await response.json();
        return data.secure_url;
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        return null;
    }
}
