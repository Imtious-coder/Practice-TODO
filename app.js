// SELECTORS
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");
const all = document.querySelector(".all");
const done = document.querySelector(".done");
const active = document.querySelector(".active");
const clear = document.querySelector(".clear");

//EVENT LISTENERS
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteTodo);
all.addEventListener("click", handleAll);
done.addEventListener("click", handleDone);
active.addEventListener("click", handleActive);
clear.addEventListener("click", handleClear);

//FUNCTIONS
function addTodo(e) {
    e.preventDefault();

    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;

    saveLocalTodos(todoInput.value);

    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    todoInput.value = "";

    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);
}

// DELETE TODO
function deleteTodo(e) {
    const item = e.target;

    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        todo.classList.add("fall");

        removeLocalTodos(todo);
        todo.addEventListener("transitionend", e => {
            todo.remove();
        });
    }
    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
        console.log(todo);
    }
}

// All todo list
function handleAll() {
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
        todo.style.display = "flex";
    })
}

// Done todo list
function handleDone(e) {
    const doneTODO = e.target.innerText;
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
        if(doneTODO === "Done") {
            if (todo.classList.contains("completed")) {
                todo.style.display = "flex";
            } else {
                todo.style.display = "none";
            }
        }
    })
}

// Active todo list
function handleActive(e) {
    const activeTODO = e.target.innerText;
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
        if(activeTODO === "Active") {
            if (todo.classList.contains("completed")) {
                todo.style.display = "none";
            } else {
                todo.style.display = "flex";
            }
        }
    })
}

// CLEAR All TODOS
function handleClear(){
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
        todo.style.display = "none";
    })
    localStorage.clear()
    location.reload();
}

// SAVE TODOS
function saveLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

// REMOVE TODOS
function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}

// GET TODOS
function getTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo) {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);
        todoInput.value = "";

        const completedButton = document.createElement("button");
        completedButton.innerHTML = `<i class="fas fa-check"></i>`;
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);

        const trashButton = document.createElement("button");
        trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);

        todoList.appendChild(todoDiv);
    });
}