// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore, collection, addDoc, Firestore, getDoc, doc} from 'firebase/firestore';
import {userData,inicializeUserData} from '../models/user';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCeOtRKUPob_HdsFzbQ0AbrOh4TXTHIyQY",
  authDomain: "steamle-f01d2.firebaseapp.com",
  projectId: "steamle-f01d2",
  storageBucket: "steamle-f01d2.appspot.com",
  messagingSenderId: "608680600970",
  appId: "1:608680600970:web:b7bab2dfd05789d8209473"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db: Firestore = getFirestore(app);

// Get a list of cities from your database

export async function addUser() {
    const newUser: userData = inicializeUserData();
    const userReference = await addDoc(collection(db,"users"), newUser);
    const userId = userReference.id;
    localStorage.setItem("userId", userId);
}


export async function getUser(userId: string) {
    const userReference = await getDoc(doc(db, "users", userId));
    return userReference.data();
}