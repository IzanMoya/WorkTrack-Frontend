// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDdIg9bARxUNVuT8rALy9w9ylFKTPLxJLA",
  authDomain: "worktrack-c18a2.firebaseapp.com",
  projectId: "worktrack-c18a2",
  storageBucket: "worktrack-c18a2.firebasestorage.app",
  messagingSenderId: "439763098158",
  appId: "1:439763098158:web:0fc81e744f4932ec6cddbf",
  measurementId: "G-2LY8HHQJF9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);