import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA6BqlgHK7U87npO9TFFNvToHdvEQimOnE",
  authDomain: "e-booking-77ae7.firebaseapp.com",
  projectId: "e-booking-77ae7",
  storageBucket: "e-booking-77ae7.appspot.com",
  messagingSenderId: "493811663592",
  appId: "1:493811663592:web:c6623be0f8c82aee90ff5d",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);
