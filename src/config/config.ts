// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore, collection, addDoc, Firestore, getDoc,setDoc, doc} from 'firebase/firestore';
import {userData} from '../models/user';

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

// methods for users

export async function addUser(newUser: userData) {
    const userReference = await addDoc(collection(db,"users"), newUser);
    const userId = userReference.id;
    return userId;
}


export async function getUser(userId: string): Promise<userData> {
    const userReference = await getDoc(doc(db, "users", userId));
    return <userData> userReference.data();
}

export async function setWin(userId: string, user: userData) {
    await setDoc(doc(db, "users", userId), user);
}

