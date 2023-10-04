// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1-ke3LTr7hueQPQn5KQ981Ieo1EYuiG0",
  authDomain: "transub-id.firebaseapp.com",
  projectId: "transub-id",
  storageBucket: "transub-id.appspot.com",
  messagingSenderId: "91164573656",
  appId: "1:91164573656:web:c68c4d8d1ab5f819203cad"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth:any = getAuth(app)
export const db = getFirestore()