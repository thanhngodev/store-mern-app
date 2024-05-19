// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "store-mern-app.firebaseapp.com",
  projectId: "store-mern-app",
  storageBucket: "store-mern-app.appspot.com",
  messagingSenderId: "284401298344",
  appId: "1:284401298344:web:dad5d583fd4e3f28fa4b9d",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
