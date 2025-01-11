import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import firebase from"firebase"

const firebaseConfig = {
  apiKey: "AIzaSyD5FTzhWx2-eroFgVC2ujYZWWPZEAlBWiE",
  authDomain: "phonic-app-f6440.firebaseapp.com",
  databaseURL: "https://phonic-app-f6440-default-rtdb.firebaseio.com",
  projectId: "phonic-app-f6440",
  storageBucket: "phonic-app-f6440.firebasestorage.app",
  messagingSenderId: "599550493085",
  appId: "1:599550493085:web:c974ed5a817fc155f46f74"
  };

// Initialize Firebase

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//console.log("Firebase app initialized:", app);

// Initialize Firestore
const database = getFirestore(app);
//console.log("Firestore instance created:", database);

export default database;