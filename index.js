const todoForm = document.querySelector('form');
const todoInput = document.getElementById('todo-input');
const todoListUL = document.getElementById('todo-list');

todoForm.addEventListener('submit', function(e){
    e.preventDefault();
    addTodo();
});

function addTodo() {
    const todoText = todoInput.value.trim();
    if(todoText.length > 0) {
        // Add to Firestore
        db.collection("todo").add({
            text: todoInput.value,
        })
    }
}



