import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";


// web app's firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "recipe-lookup-web-app.firebaseapp.com",
    projectId: "recipe-lookup-web-app",
    storageBucket: "recipe-lookup-web-app.appspot.com",
    messagingSenderId: "732468250772",
    appId: "1:732468250772:web:ca11ab3f4abf9b83304c81",
    measurementId: "G-K7QV8F48FN"
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);


// export the firebase services
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app); // Initialize and export Firestore


// export const db = getFirestore(app);
export default app;