// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyATGnkHBZT6yBnc3BoOGwQZIPRU8PRhm8U",
  authDomain: "tracker-3771f.firebaseapp.com",
  projectId: "tracker-3771f",
  storageBucket: "tracker-3771f.appspot.com",
  messagingSenderId: "602794707886",
  appId: "1:602794707886:web:2adc208b741d53b560d63f",
  measurementId: "G-MTYDJ5YN60",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
