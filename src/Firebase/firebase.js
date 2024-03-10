import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  GithubAuthProvider,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBpssmy02wlispdogr_8NjLCy3FzcOTY28",
  authDomain: "autoparts-6069d.firebaseapp.com",
  projectId: "autoparts-6069d",
  storageBucket: "autoparts-6069d.appspot.com",
  messagingSenderId: "664375045063",
  appId: "1:664375045063:web:66476501c24f53675a47e2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const GoogleProvider = new GoogleAuthProvider();
// const FacebookProvider = new FacebookAuthProvider();
const GithubProvider = new GithubAuthProvider();

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const db = getFirestore(app);
const database = getDatabase(app);
const storage = getStorage(app); // Add this line

export {
  app,
  auth,
  GoogleProvider,
  db,
  GithubProvider,
  sendPasswordResetEmail,
  database,
  storage,
};
