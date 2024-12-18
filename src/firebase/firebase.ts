import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
const firebaseConfig = {
    apiKey: process.env.API_KEY ?? "",
    authDomain: process.env.AUTH_DOMAIN ?? "",
    projectId: process.env.PROYECT_ID ?? "",
    storageBucket: process.env.STORAGE_BUCKET ?? "",
    messagingSenderId: process.env.MESSAGING_SENDER_ID ?? "",
    appId: process.env.APP_ID ?? ""
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app);
export const storage = getStorage(app);