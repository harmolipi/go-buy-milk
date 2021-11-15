class Project {
  constructor(name, description) {
    this.name = name;
    this.todoItems = [];
  }

  displayProject() {
    const projectContainer = document.createElement('div');
    projectContainer.classList.add('project-container', 'card', 'ma2', 'w5', 'h5');

    const projectBody = document.createElement('div');
    projectBody.classList.add('project-body', 'card-body', 'overflow-scroll');

    const projectHeader = document.createElement('div');
    projectHeader.classList.add('project-header', 'flex', 'flex-row-reverse', 'flex-wrap', 'justify-between');

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');

    const editButton = document.createElement('button');
    editButton.classList.add('edit-button', 'badge', 'warning', 'pa1');
    editButton.innerText = 'Edit';

    const projectTitle = document.createElement('h3');
    projectTitle.classList.add('project-title', 'card-title');
    projectTitle.innerText = this.name;

    const projectTodos = document.createElement('div');
    projectTodos.classList.add('project-todos', 'mt-4');

    projectContainer.appendChild(projectBody);
    projectBody.appendChild(projectHeader);
    projectHeader.appendChild(buttonContainer);
    buttonContainer.appendChild(editButton);
    projectHeader.appendChild(projectTitle);
    projectBody.appendChild(projectTodos);

    for(const todo of this.todoItems) {
      projectTodos.appendChild(todo.displayTodoItem());
    }

    return projectContainer;
  }

  addTodo(todo) {
    this.todoItems.push(todo);
  }
}

export { Project };