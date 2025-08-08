import { auth, db } from './firebase.js';
import { getFirestore, collection, addDoc, onSnapshot, deleteDoc, doc, updateDoc, serverTimestamp, query, orderBy, setDoc } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
import { getAuth, signOut, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
// MODALS 
// index.js (or inline in script tag)
document.addEventListener('DOMContentLoaded', () => {
  const signupModal = document.querySelector('#modal-signup');
  const loginModal = document.querySelector('#modal-login');

  const openSignup = document.querySelector('#signup-modal-trigger');
  const openLogin = document.querySelector('#login-modal-trigger');

  const modals = [signupModal, loginModal];

  // Open handlers
  openSignup?.addEventListener('click', e => {
    e.preventDefault();
    closeAllModals();
    signupModal.classList.add('show');
  });

  openLogin?.addEventListener('click', e => {
    e.preventDefault();
    closeAllModals();
    loginModal.classList.add('show');
  });

  openAccount?.addEventListener('click', e => {
    e.preventDefault();
    closeAllModals();
    accountModal.classList.add('show');
  });

  // Close modals when clicking outside
  modals.forEach(modal => {
    modal.addEventListener('click', e => {
      if (e.target === modal) {
        modal.classList.remove('show');
      }
    });
  });

  // Optional: Close on ESC key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeAllModals();
    }
  });

  function closeAllModals() {
    modals.forEach(modal => modal.classList.remove('show'));
  }
});


//================================AUTHENTICATION===============================================//

//SIGN-UP
const emailInput = document.getElementById('signup-email');
const passwordInput = document.getElementById('signup-password');
const signupForm = document.getElementById('signup-form');

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = emailInput.value;
  const password = passwordInput.value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user;

      // Save to Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        createdAt: new Date(),
      });
      emailInput.value = "";
      passwordInput.value = "";
      alert("Account Created!")
      // window.location.href = "profile.html";
    })
    .catch((error) => {
      alert(error.message);
    });
});

//LOG-IN
const emailInput2 = document.getElementById('login-email');
const passwordInput2 = document.getElementById('login-password');
const loginForm = document.getElementById('login-form');

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const loginemail = emailInput2.value;
  const loginpassword = passwordInput2.value;

  signInWithEmailAndPassword(auth, loginemail, loginpassword)
    .then((userCredential) => {
      const user = userCredential.user;

      //FUNCTION FOR LOGIN 
      window.location.href = "home.html";
      emailInput2.value = "";
      passwordInput2.value = "";
      console.log("Logged in as:", user.email);
      alert("Sign-in")
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
});

//LOG-IN
const logoutBtn = document.getElementById("logout-btn");

logoutBtn.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      window.location.href = "home.html"
    })
    .catch((error) => {
      console.error("Error signing out:", error);
    });
});