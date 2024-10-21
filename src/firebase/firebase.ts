import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
const firebaseConfig = {
    apiKey: "AIzaSyCJ_80TiHGwRULrFyByhDR3XL7JjhpjoCA",
    authDomain: "twitter-app-c5177.firebaseapp.com",
    projectId: "twitter-app-c5177",
    storageBucket: "twitter-app-c5177.appspot.com",
    messagingSenderId: "174936740945",
    appId: "1:174936740945:web:fa930832a942b201649470"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app);
export const storage = getStorage(app);