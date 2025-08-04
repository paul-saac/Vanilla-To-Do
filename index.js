  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
  import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore-compat.js";
  import { getAuth } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
  

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

// Initialize Firestore
const db = firebase.firestore();





const todoForm = document.querySelector('form');
const todoInput = document.getElementById('todo-input');
const todoListUL = document.getElementById('todo-list');
   
// Handle Form Submit
todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const todoText = todoInput.value.trim();
    if (todoText.length > 0) {
        addTodo(todoText);
        todoInput.value = "";
    }
});

// Add Todo
function addTodo(text) {
  db.collection("todo").add({
    text,
    completed: false,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  });
}

// Get and Render Todos from Firestore
function getItems() {
  db.collection("todo").orderBy("createdAt", "desc").onSnapshot(snapshot => {
        todoListUL.innerHTML = ""; // Clear old list
        snapshot.forEach(doc => {
            const data = doc.data();
            const id = doc.id;
            renderTodoItem(id, data.text, data.completed);
        });
    });
}

// Render a single Todo item
function renderTodoItem(id, text, completed) {
    const li = document.createElement("li");
    li.className = "todo";

    // Create checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `todo-${id}`;
    checkbox.checked = completed;
    checkbox.addEventListener("change", () => {
        db.collection("todo").doc(id).update({
            completed: checkbox.checked
        });
    });

    // Create custom checkbox label
    const customCheckbox = document.createElement("label");
    customCheckbox.htmlFor = `todo-${id}`;
    customCheckbox.className = "custom-checkbox";
    customCheckbox.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path fill="currentColor" d="M18.7 7.2c-.4-.4-1-.4-1.4 0l-7.5 7.5l-3.1-3.1c-.4-.4-1-.4-1.4 0c-.4.4-.4 1 0 1.4l3.8 3.8c.2.2.4.3.7.3c.3 0 .5-.1.7-.3l8.2-8.2c.4-.4.4-1 0-1.4z" />
        </svg>
    `;

    // Todo text label
    const textLabel = document.createElement("label");
    textLabel.htmlFor = `todo-${id}`;
    textLabel.className = "todo-text";
    textLabel.textContent = text;

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-button";
    deleteBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 48 48">
        <g fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="4">
            <path d="M9 10v34h30V10H9Z"/>
            <path stroke-linecap="round" d="M20 20v13m8-13v13M4 10h40"/>
            <path d="m16 10l3.289-6h9.488L32 10H16Z"/>
        </g>
        </svg>
    `;
    deleteBtn.addEventListener("click", () => {
        db.collection("todo").doc(id).delete();
    });

    // Assemble <li>
    li.appendChild(checkbox);
    li.appendChild(customCheckbox);
    li.appendChild(textLabel);
    li.appendChild(deleteBtn);

    // Add to list
    todoListUL.appendChild(li);
};
getItems();


// MODALS 
// index.js (or inline in script tag)
document.addEventListener('DOMContentLoaded', () => {
    const signupModal = document.querySelector('#modal-signup');
    const loginModal = document.querySelector('#modal-login');
    const accountModal = document.querySelector('#modal-account');

    const openSignup = document.querySelector('#signup-modal-trigger');
    const openLogin = document.querySelector('#login-modal-trigger');
    const openAccount = document.querySelector('#account-modal-trigger');

    const modals = [signupModal, loginModal, accountModal];

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


//AUT
