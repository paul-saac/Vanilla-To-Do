import { auth, db } from '../firebase/firebasemain.js';
import { collection, addDoc, onSnapshot, deleteDoc, doc, updateDoc, serverTimestamp, query, orderBy, setDoc } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
import { signOut, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
//FIRSTOREE=======================================

const todoForm = document.getElementById('form');
const todoInput = document.getElementById('todo-input');
const todoListUL = document.getElementById('todo-list');

//MODALS
const accountModal = document.querySelector('#modal-account');
const openAccount = document.querySelector('#account-modal-trigger');
const modals = [accountModal];


openAccount?.addEventListener('click', e => {
    e.preventDefault();
    closeAllModals();
    accountModal.classList.add('show');

});
modals.forEach(modal => {
    modal.addEventListener('click', e => {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });
});
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        closeAllModals();
    }
});
function closeAllModals() {
    modals.forEach(modal => modal.classList.remove('show'));
}


//LOGOUT
const logoutBtn = document.getElementById('logout-btn');
logoutBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    await auth.signOut();
    alert("User signed out");
    window.location.href = "./login.html";
});

// Handle Form Submit
todoForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const todoText = todoInput.value.trim();
    const user = auth.currentUser;
    const uid = user.uid;

    if (todoText.length > 0) {
        await addDoc(collection(db, "users", uid, "todos"), {
            text: todoText,
            completed: false,
            createdAt: serverTimestamp()
        });
        todoInput.value = "";
    }
});

// ✅ Real-Time Fetch (updated path)
function getItems(uid) {
    const todoQuery = query(
        collection(db, "users", uid, "todos"),
        orderBy("createdAt", "desc")
    );
    onSnapshot(todoQuery, (snapshot) => {
        todoListUL.innerHTML = "";
        snapshot.forEach((docSnap) => {
            const data = docSnap.data();
            const id = docSnap.id;
            renderTodoItem(uid, id, data.text, data.completed);
        });
    });
}

// ✅ Render Single Todo (with fixed uid reference)
function renderTodoItem(uid, id, text, completed) {
    const li = document.createElement("li");
    li.className = "todo";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `todo-${id}`;
    checkbox.checked = completed;
    checkbox.addEventListener("change", () => {
        updateDoc(doc(db, "users", uid, "todos", id), {
            completed: checkbox.checked
        });
    });

    const customCheckbox = document.createElement("label");
    customCheckbox.htmlFor = `todo-${id}`;
    customCheckbox.className = "custom-checkbox";
    customCheckbox.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path fill="currentColor" d="M18.7 7.2c-.4-.4-1-.4-1.4 0l-7.5 7.5l-3.1-3.1c-.4-.4-1-.4-1.4 0c-.4.4-.4 1 0 1.4l3.8 3.8c.2.2.4.3.7.3c.3 0 .5-.1.7-.3l8.2-8.2c.4-.4.4-1 0-1.4z"/>
    </svg>
  `;

    const textLabel = document.createElement("label");
    textLabel.htmlFor = `todo-${id}`;
    textLabel.className = "todo-text";
    textLabel.textContent = text;

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
        deleteDoc(doc(db, "users", uid, "todos", id));
    });

    li.appendChild(checkbox);
    li.appendChild(customCheckbox);
    li.appendChild(textLabel);
    li.appendChild(deleteBtn);
    todoListUL.appendChild(li);
}

// ✅ Listen for Auth Changes and Run getItems
onAuthStateChanged(auth, (user) => {
    if (user) {
        getItems(user.uid);

        const accountDetailsBox = document.querySelector(".account-details");
        if (accountDetailsBox) {
            const accountEmail = document.createElement("h4");
            accountEmail.innerText = `Emailss: ${user.email}`;
            accountDetailsBox.appendChild(accountEmail);
        }
    } else {
        todoListUL.innerHTML = "";
    }
});
