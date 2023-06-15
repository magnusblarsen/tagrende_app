import { FirebaseApp, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBo4A7zCpsL2jWiHlqUMHNLF257NYYi6mM",
  authDomain: "hulaholdet.firebaseapp.com",
  projectId: "hulaholdet",
  storageBucket: "hulaholdet.appspot.com",
  messagingSenderId: "172774594721",
  appId: "1:172774594721:web:19edfc4061b519a31bf8e0",
  measurementId: "G-VFSF6F3NL2"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
// export const FIREBASE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);

// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

