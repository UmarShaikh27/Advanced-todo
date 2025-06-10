// Initialize todos array and load from localStorage
let todos = JSON.parse(localStorage.getItem('todos')) || [];
let currentId = parseInt(localStorage.getItem('currentId')) || 0;

// Load todos on page load
document.addEventListener('DOMContentLoaded', () => {
    loadTodos();
});

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
    localStorage.setItem('currentId', currentId.toString());
}

function loadTodos() {
    const carddiv = document.getElementById("carddiv");
    carddiv.innerHTML = "";
    todos.forEach(todo => {
        createTodoCard(todo);
    });
}

function addfunction() {
    const titleinp = document.getElementById("titleinp");
    const descinp = document.getElementById("descinp");
    const dueDateInp = document.getElementById("dueDateInp");
    const priorityInp = document.getElementById("priorityInp");

    if (titleinp.value.length > 2 && descinp.value.length > 2) {
        const todo = {
            id: currentId++,
            title: titleinp.value,
            description: descinp.value,
            dueDate: dueDateInp.value,
            priority: priorityInp.value,
            completed: false,
            createdAt: new Date().toISOString()
        };

        todos.push(todo);
        createTodoCard(todo);
        saveTodos();

        // Clear inputs
        titleinp.value = "";
        descinp.value = "";
        dueDateInp.value = "";
        priorityInp.value = "low";
    } else {
        alert("Title and description must be at least 3 characters long");
    }
}

function createTodoCard(todo) {
    const thecard = document.createElement("div");
    thecard.classList.add("maincard", "col-lg-3", "col-md-4", "col-sm-6", "animate__animated", "animate__fadeInDown");
    thecard.dataset.todoId = todo.id;

    const priorityBadge = `<span class="badge badge-${getPriorityColor(todo.priority)}">${todo.priority}</span>`;
    const dueDateStr = todo.dueDate ? `<small class="text-muted">Due: ${new Date(todo.dueDate).toLocaleString()}</small>` : '';

    thecard.innerHTML = `
        <div class="d-flex justify-content-between align-items-center">
            <h2 class="${todo.completed ? 'completed' : ''}">${todo.title} ${priorityBadge}</h2>
            <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="complete-${todo.id}" 
                    ${todo.completed ? 'checked' : ''} onchange="toggleComplete(${todo.id})">
                <label class="custom-control-label" for="complete-${todo.id}"></label>
            </div>
        </div>
        <p class="${todo.completed ? 'completed' : ''}">${todo.description}</p>
        ${dueDateStr}
        <div class="btn-group mt-2">
            <button class="btn btn-warning btn-sm" onclick="editfunc(${todo.id})">EDIT</button>
            <button class="btn btn-danger btn-sm" onclick="delfunc(${todo.id})">DELETE</button>
        </div>
    `;

    document.getElementById("carddiv").appendChild(thecard);
}

function getPriorityColor(priority) {
    switch(priority) {
        case 'high': return 'danger';
        case 'medium': return 'warning';
        default: return 'info';
    }
}

function toggleComplete(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        saveTodos();
        loadTodos();
    }
}

function editfunc(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        document.getElementById('editTodoId').value = todo.id;
        document.getElementById('editTitleInp').value = todo.title;
        document.getElementById('editDescInp').value = todo.description;
        document.getElementById('editDueDateInp').value = todo.dueDate;
        document.getElementById('editPriorityInp').value = todo.priority;
        $('#editModal').modal('show');
    }
}

function saveEdit() {
    const id = parseInt(document.getElementById('editTodoId').value);
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.title = document.getElementById('editTitleInp').value;
        todo.description = document.getElementById('editDescInp').value;
        todo.dueDate = document.getElementById('editDueDateInp').value;
        todo.priority = document.getElementById('editPriorityInp').value;
        saveTodos();
        loadTodos();
        $('#editModal').modal('hide');
    }
}

function delfunc(id) {
    todos = todos.filter(t => t.id !== id);
    saveTodos();
    loadTodos();
}

function deleteallfunction() {
    if (confirm('Are you sure you want to delete all todos?')) {
        todos = [];
        saveTodos();
        document.getElementById("carddiv").innerHTML = "";
    }
}

