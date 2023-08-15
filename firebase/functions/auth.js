import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

export const firebaseAuth = auth;

export function logIn(email, password) {
  signInWithEmailAndPassword(firebaseAuth, email, password).catch((error) => {
    // Handle login errors and provide appropriate user feedback
    const errorCode = error.code;
    const errorMessage = error.message;

    console.log(`Error: ${errorCode}.`);
    console.log(`${errorMessage}.`);
  });
}

export function logOut() {
  signOut(firebaseAuth);
}
