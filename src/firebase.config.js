// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import Otp from './components/OTP/Otp'
import App from "./App";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDiP9FHtOAJUQ6xkH2qQXZfu1gwU65e9wM",
  authDomain: "otp-project-2bc32.firebaseapp.com",
  projectId: "otp-project-2bc32",
  storageBucket: "otp-project-2bc32.appspot.com",
  messagingSenderId: "283566819039",
  appId: "1:283566819039:web:0353f5d0978102dfcc4b6a",
  measurementId: "G-H7SX8XB1Z6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)