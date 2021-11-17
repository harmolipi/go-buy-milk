import { ProjectsController } from './projects-controller';

class DisplayController {
  static #body;
  static #content;
  static #projects;
  static #navbar;
  static #newProjectButton;
  static #newProjectInput;
  static #newProjectModal;

  static initialize() {
    this.#body = document.querySelector('body');
    this.#content = this.createContentContainer();
    this.#projects = this.createProjectsContainer();
    this.#navbar = this.createNavbar();
    this.#newProjectButton = this.#createNewProjectButton();
    this.#newProjectInput = this.#createNewProjectInput();
    this.#newProjectModal = this.#createNewProjectModal(this.#newProjectForm());

    this.#body.appendChild(this.#content);
    this.#content.prepend(this.#navbar);
    this.#content.appendChild(this.#projects);
    this.#projects.prepend(this.#newProjectButton);
    this.#projects.appendChild(this.#newProjectInput);
    this.#projects.appendChild(this.#newProjectModal);
  }

  static updateDisplay(display = ProjectsController.projects) {
    this.clearProjects(projects);

    for(const project of display) {
      this.#projects.appendChild(this.displayProject(project));
    }
  }

  static clearProjects(element) {
    while(element.lastChild && element.lastChild.classList.contains('project-container')) {
      element.removeChild(element.lastChild);
    }
  }

  static addProject(project) {
    this.displayItems.push(project);
  }

  static createContentContainer() {
    const content = document.createElement('div');
    content.id = 'content';
    content.classList.add('min-vh-100', 'h-100', 'mt3', 'ma0', 'pa0', 'paper');
    return content;
  }
  
  static createProjectsContainer() {
    const projects = document.createElement('div');
    projects.id = 'projects';
    projects.classList.add('flex', 'flex-wrap', 'pa2', 'pa3-ns');
    return projects;
  }

  static createNavbar() {
    const navbar = document.createElement('nav');
    navbar.classList.add('fixed', 'pb2');

    const navBrand = document.createElement('div');
    navBrand.classList.add('nav-brand');

    const navLink = document.createElement('a');
    navLink.classList.add('f3');
    navLink.href = '#';
    navLink.textContent = 'Go Buy Milk';

    navbar.appendChild(navBrand);
    navBrand.appendChild(navLink);

    return navbar;
  }

  static #createNewProjectButton() {
    const newProjectButton = document.createElement('div');
    newProjectButton.setAttribute('id', 'new-project-button2');
    newProjectButton.classList.add('mw5', 'pa1', 'ma3', 'flex');

    const buttonLabel = document.createElement('label');
    buttonLabel.setAttribute('for', 'new-project-input');
    buttonLabel.classList.add('paper-btn', 'bg-white', 'f4', 'f3-ns', 'flex', 'flex-column', 'items-center', 'pa2', 'pa3-ns');
  
    const plusSign = document.createElement('span');
    plusSign.classList.add('f1');
    plusSign.innerText = '+';
  
    const addNewProject = document.createElement('span');
    addNewProject.innerText = 'Add New Project';
    
    newProjectButton.appendChild(buttonLabel);
    buttonLabel.appendChild(plusSign);
    buttonLabel.appendChild(addNewProject);
  
    return newProjectButton;
  }

  static #createNewProjectInput() {
    const newInput = document.createElement('input');
    newInput.setAttribute('id', 'new-project-input');
    newInput.setAttribute('type', 'checkbox');
    newInput.classList.add('modal-state');

    return newInput;
  }

  static #createNewProjectModal(modalBody) {
    const newModalContainer = document.createElement('div');
    newModalContainer.classList.add('modal');

    const newModalLabel = document.createElement('label');
    newModalLabel.setAttribute('for', 'new-project-input');
    newModalLabel.classList.add('modal-bg');

    const newModalBody = document.createElement('div');
    newModalBody.classList.add('modal-body', 'overflow-scroll');

    const closeLabel = document.createElement('label');
    closeLabel.setAttribute('for', 'new-project-input');
    closeLabel.classList.add('btn-close');
    closeLabel.textContent = 'X';

    newModalContainer.appendChild(newModalLabel);
    newModalContainer.appendChild(newModalBody);
    newModalBody.appendChild(closeLabel);
    
    if(modalBody) {
      newModalBody.appendChild(modalBody);
    } else {
      const modalTitle = document.createElement('h4');
      modalTitle.classList.add('modal-title');
      modalTitle.textContent = 'This is the title';

      const textContent = document.createElement('p');
      textContent.classList.add('modal-text');
      textContent.textContent = "Hello! This is a longer bit of text. It keeps going. Let's see if it wraps around.";

      newModalBody.appendChild(modalTitle);
      newModalBody.appendChild(textContent);
    }

    return newModalContainer;
  }

  static #newProjectForm() {
    const newProjectContainer = document.createElement('div');
    newProjectContainer.classList.add('new-project-container', 'ma2', 'w5', 'h5');

    const projectBody = document.createElement('div');
    projectBody.classList.add('project-body', 'overflow-scroll');

    const projectTitleContainer = document.createElement('div');
    projectTitleContainer.classList.add('form-group');

    const projectTitleLabel = document.createElement('label');
    projectTitleLabel.setAttribute('for', 'new-project-title');
    projectTitleLabel.classList.add('f2');
    projectTitleLabel.textContent = 'Project Title';

    const projectTitle = document.createElement('input');
    projectTitle.setAttribute('placeholder', 'My New Project');
    projectTitle.setAttribute('type', 'text');
    projectTitle.setAttribute('id', 'new-project-title');

    const projectTodosHeader = document.createElement('h3');
    projectTodosHeader.textContent = 'Todos:';

    const projectTodos = document.createElement('div');
    projectTodos.classList.add('project-todos', 'mt-4');

    const todoList = document.createElement('ul');

    const todoItem = document.createElement('li');

    newProjectContainer.appendChild(projectBody);
    projectBody.appendChild(projectTitleContainer);
    projectTitleContainer.appendChild(projectTitleLabel);
    projectTitleContainer.appendChild(projectTitle);
    projectBody.appendChild(projectTodosHeader);
    projectBody.appendChild(projectTodos);
    projectTodos.appendChild(todoList);
    todoList.appendChild(todoItem);
    todoItem.appendChild(this.newTodoForm());

    // for(const todo of project.todoItems) {
    //   projectTodos.appendChild(todo.displayTodoItem());
    // }

    return newProjectContainer;
  }

  static newTodoForm() {
    const todoFormContainer = document.createElement('div');
    todoFormContainer.classList.add('form-group', 'nt4', 'ml3');

    const todoTitle = document.createElement('input');
    todoTitle.setAttribute('placeholder', 'Todo Title');
    todoTitle.setAttribute('type', 'text');
    todoTitle.setAttribute('id', 'new-todo-title');
    todoTitle.classList.add('mv2');

    const todoDescription = document.createElement('textarea');
    todoDescription.setAttribute('placeholder', 'Task description');
    todoDescription.classList.add('mv2');

    const dueDate = document.createElement('input');
    dueDate.setAttribute('type', 'date');
    todoDescription.classList.add('mv2');

    const todoPriority = document.createElement('select');
    todoPriority.setAttribute('id', 'new-todo-priority');
    todoPriority.classList.add('mv2');
    
    const lowPriority = document.createElement('option');
    lowPriority.setAttribute('value', 'low');
    lowPriority.textContent = 'Low';

    const mediumPriority = document.createElement('option');
    mediumPriority.setAttribute('value', 'medium');
    mediumPriority.textContent = 'Medium';

    const highPriority = document.createElement('option');
    highPriority.setAttribute('value', 'high');
    highPriority.textContent = 'High';

    const submitTodo = document.createElement('button');
    submitTodo.setAttribute('id', 'new-todo');
    submitTodo.classList.add('btn-success', 'mv2');
    submitTodo.textContent = 'Add task';

    todoFormContainer.appendChild(todoTitle);
    todoFormContainer.appendChild(todoDescription);
    todoFormContainer.appendChild(dueDate);
    todoPriority.appendChild(lowPriority);
    todoPriority.appendChild(mediumPriority);
    todoPriority.appendChild(highPriority);
    todoFormContainer.appendChild(todoPriority);
    todoFormContainer.appendChild(submitTodo);

    return todoFormContainer;
  }

  static displayProject(project) {
    const projectContainer = document.createElement('div');
    projectContainer.classList.add('project-container', 'card', 'ma2', 'w5', 'h5');

    const projectBody = document.createElement('div');
    projectBody.classList.add('project-body', 'card-body', 'overflow-scroll');

    const editButton = document.createElement('button');
    editButton.classList.add('edit-button', 'badge', 'warning', 'pa1', 'absolute', 'right-1');
    editButton.textContent = 'Edit';

    const projectTitle = document.createElement('h3');
    projectTitle.classList.add('project-title', 'card-title', 'pt3');
    projectTitle.textContent = project.name;

    const projectTodos = document.createElement('div');
    projectTodos.classList.add('project-todos', 'mt-4');

    projectContainer.appendChild(projectBody);
    projectBody.appendChild(editButton);
    projectBody.appendChild(projectTitle);
    projectBody.appendChild(projectTodos);

    for(const todo of project.todoItems) {
      projectTodos.appendChild(this.#displayTodoItem(todo));
    }

    return projectContainer;
  }

  static #displayTodoItem(todo) {
    const projectTodo = document.createElement("div");
    projectTodo.classList.add('project-todo', 'relative', 'db', 'mt2');

    const todoLabel = document.createElement('label');
    todoLabel.classList.add('todo-label', 'dib', 'mw-100', 'pl3', 'mv1');

    const todoInput = document.createElement('input');
    todoInput.classList.add('todo-input', 'absolute', 'nl3', 'mt1');
    todoInput.type = 'checkbox';
    if (todo.completed) todoInput.checked = true;

    const todoTitle = document.createElement('div');
    todoTitle.classList.add('todo-title', 'f3');
    todoTitle.innerText = todo.title;

    switch(todo.priority) {
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
    todoDescription.innerText = todo.description;

    const todoInfo = document.createElement('div');
    todoInfo.classList.add('todo-info', 'mv1');

    const todoDueDate = document.createElement('span');
    todoDueDate.classList.add('todo-due-date', 'card-subtitle');
    todoDueDate.innerText = todo.dueDate;

    projectTodo.appendChild(todoLabel);
    todoLabel.appendChild(todoInput);
    todoLabel.appendChild(todoTitle);
    todoLabel.appendChild(todoDescription);
    todoLabel.appendChild(todoInfo);
    todoInfo.appendChild(todoDueDate);

    return projectTodo;
  }
}

export { DisplayController };