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
firebase.initializeApp(firebaseConfig);

// Initialize Firestore
const db = firebase.firestore();