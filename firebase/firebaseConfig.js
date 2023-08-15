import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAJ9B-W-SLSkFJbGdTP6RzX61BVvG_xNOk",
  authDomain: "esquina-de-limpieza.firebaseapp.com",
  projectId: "esquina-de-limpieza",
  storageBucket: "esquina-de-limpieza.appspot.com",
  messagingSenderId: "138628337084",
  appId: "1:138628337084:web:fe6e2789917010f643efb9",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);
