import { initializeApp } from "firebase/app";
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, deleteUser, sendEmailVerification      } from "firebase/auth";
import { getFirestore, doc, setDoc, onSnapshot,getDoc, collection, addDoc, query, orderBy,deleteDoc, updateDoc  } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCwEqIHka7xNBkmMbQ8y7SYJn5yvSoCFME",
  authDomain: "practice-59895.firebaseapp.com",
  databaseURL: "https://practice-59895-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "practice-59895",
  storageBucket: "practice-59895.appspot.com",
  messagingSenderId: "199591437506",
  appId: "1:199591437506:web:4ddcfb5950a80527e8475b",
  measurementId: "G-BVJH3VNX01"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


export {auth,createUserWithEmailAndPassword,signInWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, deleteUser, sendEmailVerification, db, doc, setDoc, onSnapshot,getDoc, collection, addDoc,  query, orderBy,deleteDoc, updateDoc  }