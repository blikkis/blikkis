import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBpUZh3XIz1sYedTywIRycDevrqw7q4RBY",
  authDomain: "sicilia-mysteriet.firebaseapp.com",
  projectId: "sicilia-mysteriet",
  storageBucket: "sicilia-mysteriet.firebasestorage.app",
  messagingSenderId: "292776371041",
  appId: "1:292776371041:web:25ece7b8c5145cf6c79b20",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
