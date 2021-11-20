import { ProjectsController } from './projects-controller';

class DisplayController {
  static #body;
  static #content;
  static #projects;
  static #navbar;
  static #newProjectButton;
  static #newProjectInput;
  static #modalContainer;
  // static #newProjectModal;
  // static #newTodoForm;

  static initialize() {
    this.#body = document.querySelector('body');
    this.#content = this.createContentContainer();
    this.#projects = this.createProjectsContainer();
    this.#navbar = this.createNavbar();
    // this.#newTodoForm = this.#createNewTodoForm();
    this.#newProjectButton = this.#createNewProjectButton();
    this.#newProjectInput = this.#createNewProjectInput();
    this.#modalContainer = this.#createBlankModal();
    // this.#newProjectModal = this.createNewProjectModal(this.#newProjectForm(), 'new-project-modal');

    this.#body.appendChild(this.#content);
    this.#content.prepend(this.#navbar);
    this.#content.appendChild(this.#projects);
    this.#projects.prepend(this.#newProjectButton);
    this.#projects.appendChild(this.#newProjectInput);
    // this.#projects.appendChild(this.#newProjectModal);
    this.#projects.appendChild(this.#modalContainer);
  }

  static updateDisplay(display = ProjectsController.projects) {
    this.clearProjects(projects);
    const newProjectInput = document.querySelector('#projects-modal');
    // const newProjectInput = document.querySelector('#new-project-modal');
    newProjectInput.checked = false;

    for(const project of display) {
      let displayProject = this.displayProject(project)
      displayProject.dataset.projectId = project.id;
      this.#projects.appendChild(displayProject);
    }

    this.#clearProjectForm();
    this.#clearTodoListForm();
    ProjectsController.updateProjectEventListeners();
  }

  static clearProjects(element) {
    while(element.lastChild && element.lastChild.classList.contains('project-container')) {
      element.removeChild(element.lastChild);
    }
  }

  static #clearModal() {
    const projectsModal = document.querySelector('#projects-modal-container');
    while(projectsModal.firstChild) {
      projectsModal.removeChild(projectsModal.firstChild);
    }
  }

  static updateTodoList(project) {
    const projectContainer = document.querySelector(`[data-project-id="${project.id}"]`);
    const todoList = projectContainer.querySelector('.project-todos');
    this.clearTodoList(todoList);
    const horizontalRule = document.createElement('hr');

    for(const todo of project.todoItems) {
      let displayTodo = this.#displayTodoItem(todo);
      displayTodo.classList.add('mv3');
      todoList.appendChild(displayTodo);
      todoList.appendChild(horizontalRule);
    }

    const todoListForm = document.createElement('div');
    todoListForm.classList.add('mv5');

    todoListForm.appendChild(this.#createNewTodoForm());
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

    if(newProjectModal) newProjectModal.scrollTo(0, 0);
    if(title) title.value = '';
  }

  static #clearTodoListForm() {
    const title = document.querySelector('#new-todo-title');
    const description = document.querySelector('#new-todo-description');
    const dueDate = document.querySelector('#new-todo-date');
    const priority = document.querySelector('#new-todo-priority');

    if(title) {
      title.value = '';
      description.value = '';
      dueDate.value = '';
      priority.selectedIndex = 0;
    }
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
    // newProjectButton.setAttribute('id', 'new-project-button');
    newProjectButton.classList.add('mw5', 'pa1', 'ma3', 'flex');

    const buttonLabel = document.createElement('label');
    buttonLabel.setAttribute('for', 'projects-modal');
    buttonLabel.setAttribute('id', 'new-project-button');
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
    newInput.setAttribute('id', 'projects-modal');
    newInput.setAttribute('type', 'checkbox');
    newInput.classList.add('modal-state');

    return newInput;
  }

  static createNewProjectModal(modalBody, modalId) {
    const newModalContainer = document.createElement('div');
    newModalContainer.classList.add('modal');

    const newModalLabel = document.createElement('label');
    newModalLabel.setAttribute('for', modalId);
    newModalLabel.classList.add('modal-bg');

    const newModalBody = document.createElement('div');
    newModalBody.setAttribute('id', modalId);
    newModalBody.classList.add('modal-body', 'overflow-scroll');

    const closeLabel = document.createElement('label');
    closeLabel.setAttribute('for', modalId);
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
      textContent.textContent = "Hello! This is some placeholder text.";

      newModalBody.appendChild(modalTitle);
      newModalBody.appendChild(textContent);
    }

    return newModalContainer;
  }

  static #createBlankModal() {
    const newModalContainer = document.createElement('div');
    newModalContainer.classList.add('modal');

    const newModalLabel = document.createElement('label');
    newModalLabel.setAttribute('for', 'projects-modal');
    newModalLabel.classList.add('modal-bg');

    const newModalBody = document.createElement('div');
    newModalBody.setAttribute('id', 'projects-modal-container');
    newModalBody.classList.add('modal-body', 'overflow-scroll');

    const closeLabel = document.createElement('label');
    closeLabel.setAttribute('for', 'projects-modal');
    closeLabel.classList.add('btn-close');
    closeLabel.textContent = 'X';

    newModalContainer.appendChild(newModalLabel);
    newModalContainer.appendChild(newModalBody);
    newModalBody.appendChild(closeLabel);
    
    return newModalContainer;
  }

  static changeModalContents(modalBodyContents) {
    this.#clearModal();
    const modalBody = document.querySelector('#projects-modal-container');
    modalBody.appendChild(modalBodyContents);
  }

  static newProjectForm(project) {
    const newProjectContainer = document.createElement('div');
    newProjectContainer.classList.add('new-project-container', 'ma2', 'w5', 'h5');

    newProjectContainer.dataset.projectId = project ? project.id : 'new';

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
    projectTitle.value = project ? project.name : '';

    const projectTodosHeader = document.createElement('h3');
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
    projectSaveRow.appendChild(projectSaveContainer);
    projectSaveContainer.appendChild(projectSaveButton);
    projectBody.appendChild(projectSaveRow);

    if(project) {
      project.todoItems.forEach(todo => {
        todoList.appendChild(this.#createNewTodoForm(todo));
      });
    }
    
    todoList.appendChild(this.#createNewTodoForm());

    return newProjectContainer;
  }

  static #createNewTodoForm(todo) {
    const todoFormContainer = document.createElement('div');
    todoFormContainer.classList.add('form-group', 'nt4', 'ml3');

    const todoTitle = document.createElement('input');
    todoTitle.setAttribute('placeholder', 'Todo Title');
    todoTitle.setAttribute('type', 'text');
    todoTitle.setAttribute('id', 'new-todo-title');
    todoTitle.classList.add('mv2');

    const todoDescription = document.createElement('textarea');
    todoDescription.setAttribute('placeholder', 'Task description');
    todoDescription.setAttribute('id', 'new-todo-description');
    todoDescription.classList.add('mv2');

    const dueDate = document.createElement('input');
    dueDate.setAttribute('type', 'date');
    dueDate.setAttribute('id', 'new-todo-date');
    dueDate.classList.add('mv2');

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
    submitTodo.classList.add('btn-secondary', 'mv2');
    if(todo) {
      todoTitle.value = todo.title;
      todoDescription.value = todo.description;
      dueDate.value = todo.dueDate;
      submitTodo.textContent = 'Update Task';
      submitTodo.setAttribute('id', 'save-todo');
      submitTodo.dataset.projectId = todo.projectId;
      submitTodo.dataset.todoId = todo.id;
    } else {
      submitTodo.setAttribute('id', 'new-todo');
      submitTodo.textContent = 'Add Task';
    }

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

  // Turning the whole project display into a label button to pop it up in a modal
  static displayProject(project, editing) {
    const projectContainer = document.createElement('div');
    projectContainer.classList.add('project-container', 'card', 'ma2', 'w5', 'h5');

    const projectLabelContainer = document.createElement('div');
    // projectLabelContainer.datalist.projectId = project.id;
    projectLabelContainer.classList.add('project-label-container');

    const projectLabel = document.createElement('label');
    projectLabel.dataset.projectId = project.id;
    projectLabel.setAttribute('for', `projects-modal`);
    projectLabel.classList.add('project-labels');
    // projectLabel.setAttribute('for', `edit-button-input-${project.id}`);

    const projectBody = document.createElement('div');
    projectBody.classList.add('project-body', 'card-body', 'overflow-scroll', 'h5');

    // const editButton = document.createElement('button');
    // editButton.classList.add('edit-button', 'badge', 'warning', 'pa1', 'absolute', 'right-1');
    // editButton.dataset.projectId = project.id;
    // editButton.textContent = 'Edit';

    // const editButtonContainer = document.createElement('div');
    // editButtonContainer.classList.add('edit-button-container', 'row', 'flex-spaces', 'absolute', 'right-1');
    // editButtonContainer.classList.add('edit-button-container', 'absolute', 'right-1', 'top-1');

    // const editButtonLabel = document.createElement('label');
    // editButtonLabel.dataset.projectId = project.id;
    // editButtonLabel.setAttribute('for', `edit-button-input-${project.id}`);
    // editButtonLabel.classList.add('edit-button', 'paper-btn', 'badge', 'warning', 'pa2');
    // editButtonLabel.textContent = 'Edit';

    const editProjectInput = document.createElement('input');
    editProjectInput.setAttribute('id', `new-project-modal`);
    editProjectInput.setAttribute('type', 'checkbox');
    editProjectInput.classList.add('modal-state');

    // const editModalContainer = document.createElement('div');
    // editModalContainer.classList.add('modal');

    // const editModalLabel = document.createElement('label');
    // editModalLabel.setAttribute('for', 'edit-modal-input');
    // editModalLabel.classList.add('modal-bg');

    const editModal = this.createNewProjectModal(this.newProjectForm(project), `edit-button-input-${project.id}`);

    const projectTitle = document.createElement('h3');
    projectTitle.classList.add('project-title', 'card-title');
    projectTitle.textContent = project.name;

    const projectTodos = document.createElement('div');
    projectTodos.classList.add('project-todos', 'mt-4');

    projectContainer.appendChild(projectLabelContainer);
    projectLabelContainer.appendChild(projectLabel);
    projectContainer.appendChild(editProjectInput);
    projectLabel.appendChild(projectBody);
    // projectBody.appendChild(editButtonContainer);
    // editButtonContainer.appendChild(editButtonLabel);
    // projectBody.appendChild(editButtonInput);
    // projectBody.appendChild(editModal);
    // projectBody.appendChild(editModal);
    projectBody.appendChild(projectTitle);
    projectBody.appendChild(projectTodos);
    // modalContainer.appendChild(editModal);

    if(editing) {
      project.todoItems.forEach(todo => {
        projectTodos.appendChild(this.#createNewTodoForm(todo));
      });
    } else{
      for(const todo of project.todoItems) {
        projectTodos.appendChild(this.#displayTodoItem(todo));
      }
    }

    return projectContainer;
  }

  // Using its own self-contained modal
  // static displayProject(project, editing) {
  //   const projectContainer = document.createElement('div');
  //   projectContainer.classList.add('project-container', 'card', 'ma2', 'w5', 'h5');

  //   const projectBody = document.createElement('div');
  //   projectBody.classList.add('project-body', 'card-body', 'overflow-scroll');

  //   // const editButton = document.createElement('button');
  //   // editButton.classList.add('edit-button', 'badge', 'warning', 'pa1', 'absolute', 'right-1');
  //   // editButton.dataset.projectId = project.id;
  //   // editButton.textContent = 'Edit';

  //   const editButtonContainer = document.createElement('div');
  //   // editButtonContainer.classList.add('edit-button-container', 'row', 'flex-spaces', 'absolute', 'right-1');
  //   editButtonContainer.classList.add('edit-button-container', 'absolute', 'right-1', 'top-1');

  //   const editButtonLabel = document.createElement('label');
  //   editButtonLabel.dataset.projectId = project.id;
  //   editButtonLabel.setAttribute('for', `edit-button-input-${project.id}`);
  //   editButtonLabel.classList.add('edit-button', 'paper-btn', 'badge', 'warning', 'pa2');
  //   editButtonLabel.textContent = 'Edit';

  //   const editButtonInput = document.createElement('input');
  //   editButtonInput.setAttribute('id', `edit-button-input-${project.id}`);
  //   editButtonInput.setAttribute('type', 'checkbox');
  //   editButtonInput.classList.add('modal-state');

  //   // const editModalContainer = document.createElement('div');
  //   // editModalContainer.classList.add('modal');

  //   // const editModalLabel = document.createElement('label');
  //   // editModalLabel.setAttribute('for', 'edit-modal-input');
  //   // editModalLabel.classList.add('modal-bg');

  //   const editModal = this.createNewProjectModal(this.#newProjectForm(project), `edit-button-input-${project.id}`);

  //   const projectTitle = document.createElement('h3');
  //   projectTitle.classList.add('project-title', 'card-title', 'pt4');
  //   projectTitle.textContent = project.name;

  //   const projectTodos = document.createElement('div');
  //   projectTodos.classList.add('project-todos', 'mt-4');

  //   projectContainer.appendChild(projectBody);
  //   projectBody.appendChild(editButtonContainer);
  //   editButtonContainer.appendChild(editButtonLabel);
  //   projectBody.appendChild(editButtonInput);
  //   projectBody.appendChild(editModal);
  //   // projectBody.appendChild(editModal);
  //   projectBody.appendChild(projectTitle);
  //   projectBody.appendChild(projectTodos);
  //   // modalContainer.appendChild(editModal);

  //   if(editing) {
  //     project.todoItems.forEach(todo => {
  //       projectTodos.appendChild(this.#createNewTodoForm(todo));
  //     });
  //   } else{
  //     for(const todo of project.todoItems) {
  //       projectTodos.appendChild(this.#displayTodoItem(todo));
  //     }
  //   }

  //   return projectContainer;
  // }

  // Trying label with same id as new project button, to swap out modal contents via js
  // static displayProject(project, editing) {
  //   const projectContainer = document.createElement('div');
  //   projectContainer.classList.add('project-container', 'card', 'ma2', 'w5', 'h5');

  //   const projectBody = document.createElement('div');
  //   projectBody.classList.add('project-body', 'card-body', 'overflow-scroll');

  //   // const editButton = document.createElement('button');
  //   // editButton.classList.add('edit-button', 'badge', 'warning', 'pa1', 'absolute', 'right-1');
  //   // editButton.dataset.projectId = project.id;
  //   // editButton.textContent = 'Edit';

  //   const editButtonContainer = document.createElement('div');
  //   // editButtonContainer.classList.add('edit-button-container', 'row', 'flex-spaces', 'absolute', 'right-1');
  //   editButtonContainer.classList.add('edit-button-container', 'absolute', 'right-1', 'top-1');

  //   const editButtonLabel = document.createElement('label');
  //   editButtonLabel.dataset.projectId = project.id;
  //   editButtonLabel.setAttribute('for', `new-project-input`);
  //   editButtonLabel.classList.add('edit-button', 'paper-btn', 'badge', 'warning', 'pa2');
  //   editButtonLabel.textContent = 'Edit';

  //   const editButtonInput = document.createElement('input');
  //   editButtonInput.setAttribute('id', `new-project-input`);
  //   editButtonInput.setAttribute('type', 'checkbox');
  //   editButtonInput.classList.add('modal-state');

  //   // const editModalContainer = document.createElement('div');
  //   // editModalContainer.classList.add('modal');

  //   // const editModalLabel = document.createElement('label');
  //   // editModalLabel.setAttribute('for', 'edit-modal-input');
  //   // editModalLabel.classList.add('modal-bg');

  //   // const editModal = this.createNewProjectModal(this.#newProjectForm(project), `new-project-input`);

  //   const projectTitle = document.createElement('h3');
  //   projectTitle.classList.add('project-title', 'card-title', 'pt4');
  //   projectTitle.textContent = project.name;

  //   const projectTodos = document.createElement('div');
  //   projectTodos.classList.add('project-todos', 'mt-4');

  //   projectContainer.appendChild(projectBody);
  //   projectBody.appendChild(editButtonContainer);
  //   editButtonContainer.appendChild(editButtonLabel);
  //   projectBody.appendChild(editButtonInput);
  //   // projectBody.appendChild(editModal);
  //   // projectBody.appendChild(editModal);
  //   projectBody.appendChild(projectTitle);
  //   projectBody.appendChild(projectTodos);
  //   // modalContainer.appendChild(editModal);

  //   if(editing) {
  //     project.todoItems.forEach(todo => {
  //       projectTodos.appendChild(this.#createNewTodoForm(todo));
  //     });
  //   } else{
  //     for(const todo of project.todoItems) {
  //       projectTodos.appendChild(this.#displayTodoItem(todo));
  //     }
  //   }

  //   return projectContainer;
  // }

  static #displayTodoItem(todo) {
    const projectTodo = document.createElement("div");
    projectTodo.classList.add('project-todo', 'relative', 'db', 'mt2');
    projectTodo.dataset.todoId = `${todo.projectId}-${todo.id}`;


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