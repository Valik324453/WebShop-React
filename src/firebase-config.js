import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

export const firebaseConfig = {
  apiKey: "AIzaSyDgxP12WZ1wuzWiFPDvBUJGbS4mnAvJORw",
  authDomain: "fir-test-b5004.firebaseapp.com",
  projectId: "fir-test-b5004",
  storageBucket: "fir-test-b5004.appspot.com",
  messagingSenderId: "1038113943363",
  appId: "1:1038113943363:web:589ad5b954af11733189f6",
  measurementId: "G-S21PDG301J",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
