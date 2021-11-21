import { ProjectsController } from './projects-controller';

class DisplayController {
  static #body;
  static #content;
  static #projects;
  static #navbar;
  static #newProjectButton;
  static #newProjectInput;
  static #newProjectModal;
  static #newTodoForm;

  static initialize() {
    this.#body = document.querySelector('body');
    this.#content = this.createContentContainer();
    this.#projects = this.createProjectsContainer();
    this.#navbar = this.createNavbar();
    this.#newTodoForm = this.#createNewTodoForm();
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
    const newProjectInput = document.querySelector('#new-project-input');
    newProjectInput.checked = false;

    for(const project of display) {
      let displayProject = this.displayProject(project)
      displayProject.dataset.projectId = project.id;
      this.#projects.appendChild(displayProject);
    }

    this.#clearProjectForm();
    this.#clearTodoListForm();
    ProjectsController.updateEventListeners();
  }

  static clearProjects(element) {
    while(element.lastChild && element.lastChild.classList.contains('project-container')) {
      element.removeChild(element.lastChild);
    }
  }

  static updateTodoList(project) {
    const projectContainer = document.querySelector(`[data-project-id="${project.id}"]`);
    const todoList = projectContainer.querySelector('.project-todos');
    this.clearTodoList(todoList);

    for(const todo of project.todoItems) {
      let displayTodo = this.#displayTodoItem(todo);
      displayTodo.classList.add('mv3');
      todoList.appendChild(displayTodo);
      const horizontalRule = document.createElement('hr');
      todoList.appendChild(horizontalRule);
    }

    const todoListForm = document.createElement('div');
    todoListForm.classList.add('mv5');
    todoListForm.appendChild(this.#newTodoForm);
    todoList.appendChild(todoListForm);
    this.#clearTodoListForm();
  }

  static clearTodoList(todoList) {
    while(todoList.firstChild) {
      todoList.removeChild(todoList.firstChild);
    }
  }

  static #clearProjectForm() {
    const newProjectModal = document.querySelector('#new-project-modal');
    const title = document.querySelector('#new-project-title-input');

    newProjectModal.scrollTo(0, 0);
    title.value = '';
  }

  static #clearTodoListForm() {
    const title = document.querySelector('#new-todo-title');
    const description = document.querySelector('#new-todo-description');
    const dueDate = document.querySelector('#new-todo-date');
    const priority = document.querySelector('#new-todo-priority');

    title.value = '';
    description.value = '';
    dueDate.value = '';
    priority.selectedIndex = 0;
  }

  static createContentContainer() {
    const content = document.createElement('div');
    content.id = 'content';
    content.classList.add('min-vh-100', 'h-100', 'ma0', 'pa0', 'paper');
    return content;
  }
  
  static createProjectsContainer() {
    const projects = document.createElement('div');
    projects.id = 'projects';
    projects.classList.add('flex', 'flex-wrap', 'mt3', 'pa2', 'pa3-ns');
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
    newModalBody.setAttribute('id', 'new-project-modal');
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

  static #newProjectForm(project) {
    const newProjectContainer = document.createElement('div');
    newProjectContainer.classList.add('new-project-container', 'ma2', 'w5', 'h5');
    newProjectContainer.dataset.projectId = 'new';

    const projectBody = document.createElement('div');
    projectBody.classList.add('project-body', 'overflow-scroll');

    const projectTitleContainer = document.createElement('div');
    projectTitleContainer.classList.add('form-group');

    const projectTitleLabel = document.createElement('label');
    projectTitleLabel.setAttribute('for', 'new-project-title-input');
    projectTitleLabel.setAttribute('id', 'new-project-title');
    projectTitleLabel.classList.add('f2');
    projectTitleLabel.textContent = 'Project Title';

    const projectTitle = document.createElement('input');
    projectTitle.setAttribute('placeholder', 'My New Project');
    projectTitle.setAttribute('type', 'text');
    projectTitle.setAttribute('id', 'new-project-title-input');
    if(project) { projectTitle.value = project.title; }

    const projectTodosHeader = document.createElement('h3');
    projectTodosHeader.classList.add('nb2');
    projectTodosHeader.textContent = 'Todos:';

    const projectTodos = document.createElement('div');
    projectTodos.classList.add('project-todos', 'mt-4');

    const todoList = document.createElement('div');

    const projectSaveRow = document.createElement('div');
    projectSaveRow.classList.add('row');

    const projectSaveContainer = document.createElement('div');
    projectSaveContainer.classList.add('col-12', 'col');

    const projectSaveButton = document.createElement('button');
    projectSaveButton.setAttribute('id', 'new-project-save');
    projectSaveButton.classList.add('btn-block', 'btn-success');
    projectSaveButton.textContent = 'Save Project';

    newProjectContainer.appendChild(projectBody);
    projectBody.appendChild(projectTitleContainer);
    projectTitleContainer.appendChild(projectTitleLabel);
    projectTitleContainer.appendChild(projectTitle);
    projectBody.appendChild(projectTodosHeader);
    projectBody.appendChild(projectTodos);
    projectTodos.appendChild(todoList);
    todoList.appendChild(this.#newTodoForm);
    projectSaveRow.appendChild(projectSaveContainer);
    projectSaveContainer.appendChild(projectSaveButton);
    projectBody.appendChild(projectSaveRow);

    return newProjectContainer;
  }

  static #createNewTodoForm(project) {
    const todoFormContainer = document.createElement('div');
    todoFormContainer.classList.add('form-group', 'ml3');

    const todoTitle = document.createElement('input');
    todoTitle.setAttribute('placeholder', 'Todo Title');
    todoTitle.setAttribute('type', 'text');
    todoTitle.setAttribute('id', project ? `newTodoTitle${project.id}` : 'new-todo-title');
    todoTitle.style.display = 'block';
    todoTitle.classList.add('mv2');

    const todoDescription = document.createElement('textarea');
    todoDescription.setAttribute('placeholder', 'Task description');
    todoDescription.setAttribute('id', project ? `newTodoDescription${project.id}` : 'new-todo-description');
    todoDescription.classList.add('mv2');

    const dueDate = document.createElement('input');
    dueDate.setAttribute('type', 'date');
    dueDate.setAttribute('id', project ? `newTodoDate${project.id}` : 'new-todo-date');
    dueDate.style.display = 'block';
    dueDate.classList.add('mv2');

    const todoPriority = document.createElement('select');
    todoPriority.setAttribute('id', project ? `newTodoPriority${project.id}` : 'new-todo-priority');
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
    if(project) {
      submitTodo.setAttribute('id', `updateTodo${project.id}`)
      submitTodo.dataset.projectId = project.id;
    } else {
      submitTodo.setAttribute('id', 'new-todo');
    }
    if(submitTodo.id != 'new-todo') submitTodo.classList.add('update-todos');
    submitTodo.classList.add('btn-secondary', 'mv2');
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

    const projectTitle = document.createElement('h3');
    projectTitle.classList.add('project-title', 'card-title');
    projectTitle.textContent = project.name;

    const projectTodos = document.createElement('div');
    projectTodos.classList.add('project-todos', 'mt-4');

    projectContainer.appendChild(projectBody);
    projectBody.appendChild(projectTitle);
    projectBody.appendChild(projectTodos);

    for(const todo of project.todoItems) {
      projectTodos.appendChild(this.#displayTodoItem(todo));
    }

    const todoCollapsibleFormContainer = document.createElement('div');
    todoCollapsibleFormContainer.classList.add('collapsible', 'w-100');

    const todoCollapsibleFormInput = document.createElement('input');
    todoCollapsibleFormInput.setAttribute('id', `collapsibleForm${project.id}`);
    todoCollapsibleFormInput.setAttribute('type', 'checkbox');
    todoCollapsibleFormInput.setAttribute('name', 'collapsible');

    const todoOpenForm = document.createElement('label');
    todoOpenForm.setAttribute('for', `collapsibleForm${project.id}`)
    todoOpenForm.classList.add('todo-open-form');
    todoOpenForm.style.textAlign = 'left';
    todoOpenForm.textContent = 'Add another task';

    const todoFormContainer = document.createElement('div');
    todoFormContainer.classList.add('collapsible-body');

    projectTodos.appendChild(todoCollapsibleFormContainer);
    todoCollapsibleFormContainer.appendChild(todoCollapsibleFormInput);
    todoCollapsibleFormContainer.appendChild(todoOpenForm);
    todoCollapsibleFormContainer.appendChild(todoFormContainer);
    todoFormContainer.appendChild(this.#createNewTodoForm(project));

    return projectContainer;
  }

  static #displayTodoItem(todo) {
    const projectTodo = document.createElement("div");
    projectTodo.classList.add('project-todo', 'relative', 'db', 'mt2');
    projectTodo.dataset.todoId = `${todo.project_id}-${todo.id}`;

    const todoLabelGroup = document.createElement('fieldset');
    todoLabelGroup.classList.add('form-group');

    const todoLabel = document.createElement('div');
    todoLabel.classList.add('todo-label', 'dib', 'mw-100', 'pl3', 'mv1', 'paper-check', 'flex', 'flex-nowrap', 'items-center');

    const todoInput = document.createElement('input');
    todoInput.classList.add('todo-input', 'absolute', 'nl3', 'h1', 'w1');
    todoInput.type = 'checkbox';
    todoInput.dataset.todoId = todo.id;
    if (todo.completed) todoInput.checked = true;

    const todoDescription = document.createElement('span');
    todoDescription.classList.add('todo-description', 'mv1');
    todoDescription.innerText = todo.description;

    const todoInfo = document.createElement('div');
    todoInfo.classList.add('todo-info', 'mv1');

    projectTodo.appendChild(todoLabel);
    todoLabel.appendChild(todoInput);

    todoLabel.appendChild(this.#displayCollapsibleTodo(todo));

    return projectTodo;
  }

  static #displayCollapsibleTodo(todo) {
    const todoCollapsibleContainer = document.createElement('div');
    todoCollapsibleContainer.classList.add('collapsible', 'w-100');

    const todoCollapsibleInput = document.createElement('input');
    todoCollapsibleInput.setAttribute('id', `collapsible${todo.projectId}${todo.id}`);
    todoCollapsibleInput.setAttribute('type', 'checkbox');
    todoCollapsibleInput.setAttribute('name', 'collapsible');

    const todoTitle = document.createElement('label');
    todoTitle.setAttribute('for', `collapsible${todo.projectId}${todo.id}`)
    todoTitle.classList.add('todo-title');
    todoTitle.style.textAlign = 'left';

    const todoTitleText = document.createElement('span');
    todoTitleText.classList.add('todo-title-text', 'f3', 'mr3');
    todoTitleText.textContent = todo.title;

    const todoDate = document.createElement('span');
    todoDate.classList.add('todo-date', 'f6');
    todoDate.textContent = todo.dueDate

    const todoDescriptionContainer = document.createElement('div');
    todoDescriptionContainer.classList.add('collapsible-body');

    const todoDescription = document.createElement('span');
    todoDescription.classList.add('todo-description', 'mv1');
    todoDescription.textContent = todo.description;

    const deleteButton = document.createElement('button');
    deleteButton.dataset.projectId = todo.projectId;
    deleteButton.dataset.todoId = todo.id;
    deleteButton.classList.add('delete-button', 'badge', 'danger', 'pa1', 'absolute', 'top-1', 'right-0');
    deleteButton.textContent = 'Delete';

    todoCollapsibleContainer.appendChild(todoCollapsibleInput);
    todoCollapsibleContainer.appendChild(todoTitle);
    todoTitle.appendChild(todoTitleText);
    todoTitle.appendChild(document.createElement('br'));
    todoTitle.appendChild(todoDate);
    todoCollapsibleContainer.appendChild(todoDescriptionContainer);
    todoDescriptionContainer.appendChild(deleteButton);
    todoDescriptionContainer.appendChild(todoDescription);

    switch(todo.priority) {
      case 'high':
        todoTitleText.classList.add('red');
        break;
      case 'medium':
        todoTitleText.classList.add('gold');
        break;
      case 'low':
        todoTitleText.classList.add('green');
        break;
    }

    return todoCollapsibleContainer;
  }
}

export { DisplayController };