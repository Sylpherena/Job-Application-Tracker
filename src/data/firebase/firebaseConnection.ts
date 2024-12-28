import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA13-yYGr2Qa4jWv32iQSBFqg9fjriPh6c",
  authDomain: "job-application-tracker-ea95a.firebaseapp.com",
  projectId: "job-application-tracker-ea95a",
  storageBucket: "job-application-tracker-ea95a.firebasestorage.app",
  messagingSenderId: "217973525153",
  appId: "1:217973525153:web:a6175a9a327fabbcc37ee0",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
