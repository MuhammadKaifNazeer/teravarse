let todos = JSON.parse(localStorage.getItem('todos')) || [];
let currentEditingId = null;

function displayTodos(filteredTodos = null) {
    const todosContainer = document.getElementById('todos');
    todosContainer.innerHTML = '';
  
    const todosToDisplay = filteredTodos || todos;
  
    if (todosToDisplay.length === 0) {
      const noTodosMessage = document.createElement('p');
      noTodosMessage.className = 'text-center col-lg-12 no-todos-message';
      noTodosMessage.textContent = 'No Todos to display here. Please add some todos.';
      todosContainer.appendChild(noTodosMessage);
    } else {
      todosToDisplay.forEach(todo => {
        const todoItem = document.createElement('div');
        todoItem.className = `col-lg-12 col-sm-12 mb-3`;
        
        // Check if the task is completed and add the 'completed' class accordingly
        const cardClass = todo.completed ? 'card completed' : 'card';
    
        todoItem.innerHTML = `
          <div class="${cardClass}">
            <div class="card-body">
              <div class="d-flex justify-content-between">
                <h5 class="card-title">${todo.title}</h5>
                <div class="d-flex">
                  <i class="fa-solid fa-pen-to-square mr-2" style="cursor: pointer;" onclick="openEditModal(${todo.id})"></i>
                  <i class="fa-solid fa-check mr-2" style="cursor: pointer;" onclick="completeTodo(${todo.id})"></i>
                  <i class="fa-solid fa-trash" style="cursor: pointer;" onclick="deleteTodo(${todo.id})"></i>
                </div>
              </div>
              <p class="card-text">${todo.description}</p>
            </div>
          </div>
        `;
        todosContainer.appendChild(todoItem);
      });
    }
  }
  
  

function filterTodos() {
    const filter = document.getElementById('filter').value;
    let filteredTodos = [];

    if (filter === 'incomplete') {
        filteredTodos = todos.filter(todo => !todo.completed);
    } else if (filter === 'completed') {
        filteredTodos = todos.filter(todo => todo.completed);
    } else {
        filteredTodos = todos;
    }

    displayTodos(filteredTodos);
}

function searchTodos() {
    const searchKeyword = document.getElementById('search').value.toLowerCase();
    const filteredTodos = todos.filter(todo =>
        todo.title.toLowerCase().includes(searchKeyword) ||
        todo.description.toLowerCase().includes(searchKeyword)
    );

    displayTodos(filteredTodos);
}

function addTodo() {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;

    if (title && description) {
        const newTodo = {
            id: todos.length + 1,
            title,
            description,
            completed: false
        };

        todos.push(newTodo);
        localStorage.setItem('todos', JSON.stringify(todos));
        displayTodos();
        clearAddTodoForm();
        $('#addTodoModal').modal('hide');
    }
}

function clearAddTodoForm() {
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
}

function openEditModal(todoId) {
    const todoToEdit = todos.find(todo => todo.id === todoId);

    document.getElementById('editTitle').value = todoToEdit.title;
    document.getElementById('editDescription').value = todoToEdit.description;
    currentEditingId = todoId;

    $('#editTodoModal').modal('show');
}

function saveEdit() {
    const todoId = todos.findIndex(todo => todo.id === currentEditingId);
    todos[todoId].title = document.getElementById('editTitle').value;
    todos[todoId].description = document.getElementById('editDescription').value;

    localStorage.setItem('todos', JSON.stringify(todos));
    displayTodos();
    $('#editTodoModal').modal('hide');
}

function completeTodo(todoId) {
    const todoIndex = todos.findIndex(todo => todo.id === todoId);
    todos[todoIndex].completed = !todos[todoIndex].completed;

    localStorage.setItem('todos', JSON.stringify(todos));
    displayTodos();
}

function deleteTodo(todoId) {
    todos = todos.filter(todo => todo.id !== todoId);

    localStorage.setItem('todos', JSON.stringify(todos));
    displayTodos();
}

displayTodos();