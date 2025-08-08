import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getFirestore, } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
import { getAuth, } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

// Firebase configuration using compat libraries
const firebaseConfig = {
  apiKey: "AIzaSyAuUnlvwPdm_npCVjS3rXJfFZHMwIZP0ZM",
  authDomain: "vanilla-to-do.firebaseapp.com",
  projectId: "vanilla-to-do",
  storageBucket: "vanilla-to-do.firebasestorage.app",
  messagingSenderId: "783719500831",
  appId: "1:783719500831:web:b24b6697a39af090e4592a",
  measurementId: "G-9KB44NXMFF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
const auth = getAuth(app);

export { app, auth, db };
