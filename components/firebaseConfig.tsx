import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "@firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDijhfMk2-cNOYHzoRW_BQoq0SifC8D5fc",
  authDomain: "facebook-post-5da25.firebaseapp.com",
  projectId: "facebook-post-5da25",
  storageBucket: "facebook-post-5da25.appspot.com",
  messagingSenderId: "672112870431",
  appId: "1:672112870431:web:f59674cd0606f2bf49812a",
  measurementId: "G-5ZF9NHKZMV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
export { db, storage };
