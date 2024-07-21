
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDamNnYsJEXb9YCZqICefOX25xVdHyznfE",
  authDomain: "music-f1778.firebaseapp.com",
  projectId: "music-f1778",
  storageBucket: "music-f1778.appspot.com",
  messagingSenderId: "915892083645",
  appId: "1:915892083645:web:e14e99f73571c69b0e90d4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
