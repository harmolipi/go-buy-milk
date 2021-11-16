class TodoItem {
  constructor(title, description, dueDate, priority, completed) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.completed = completed;
  }

  displayTodoItem() {
    const projectTodo = document.createElement("div");
    projectTodo.classList.add('project-todo', 'relative', 'db', 'mt2');

    const todoLabel = document.createElement('label');
    todoLabel.classList.add('todo-label', 'dib', 'mw-100', 'pl3', 'mv1');

    const todoInput = document.createElement('input');
    todoInput.classList.add('todo-input', 'absolute', 'nl3', 'mt1');
    todoInput.type = 'checkbox';
    if (this.completed) todoInput.checked = true;

    const todoTitle = document.createElement('div');
    todoTitle.classList.add('todo-title', 'f3');
    todoTitle.innerText = this.title;

    switch(this.priority) {
      case 'high':
        todoTitle.classList.add('red');
        break;
      case 'medium':
        todoTitle.classList.add('gold');
        break;
      case 'low':
        todoTitle.classList.add('green');
        break;
    }

    const todoDescription = document.createElement('span');
    todoDescription.classList.add('todo-description', 'mv1');
    todoDescription.innerText = this.description;

    const todoInfo = document.createElement('div');
    todoInfo.classList.add('todo-info', 'mv1');

    const todoDueDate = document.createElement('span');
    todoDueDate.classList.add('todo-due-date', 'card-subtitle');
    todoDueDate.innerText = this.dueDate;

    projectTodo.appendChild(todoLabel);
    todoLabel.appendChild(todoInput);
    todoLabel.appendChild(todoTitle);
    todoLabel.appendChild(todoDescription);
    todoLabel.appendChild(todoInfo);
    todoInfo.appendChild(todoDueDate);

    return projectTodo;
  }
}

export { TodoItem };