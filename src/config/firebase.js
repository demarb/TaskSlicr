// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyApirWZTMJnqNphfyJb8vDMOKQIbnQfj48",
    authDomain: "time-slicr.firebaseapp.com",
    projectId: "time-slicr",
    storageBucket: "time-slicr.appspot.com",
    messagingSenderId: "516854908941",
    appId: "1:516854908941:web:7864583993d12745ccad44",
    measurementId: "G-0Z34RFKYTT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider();

export const database = getFirestore(app)