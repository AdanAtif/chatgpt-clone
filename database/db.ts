import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBDEQmxNYNCH5noIPsOGiJm18huu4z27uM",
  authDomain: "chat-gpt-clone-89e7e.firebaseapp.com",
  projectId: "chat-gpt-clone-89e7e",
  storageBucket: "chat-gpt-clone-89e7e.firebasestorage.app",
  messagingSenderId: "714795043718",
  appId: "1:714795043718:web:32b99837d6df82cd633a07",
  measurementId: "G-VZVR90BGT1",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const firestore = getFirestore(app);

export { auth, db, firestore };
