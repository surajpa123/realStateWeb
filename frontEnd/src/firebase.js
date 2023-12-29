// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FREBASE_API_KEY,
  authDomain: "mern-estate-b907a.firebaseapp.com",
  projectId: "mern-estate-b907a",
  storageBucket: "mern-estate-b907a.appspot.com",
  messagingSenderId: "579124261953",
  appId: "1:579124261953:web:007fda42ad8d3b66b982c0"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);