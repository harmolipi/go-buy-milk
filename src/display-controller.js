import { ProjectsController } from './projects-controller';

class DisplayController {
  static #body;
  static #content;
  static #projects;
  static #navbar;
  static #newProjectButton;

  static initialize() {
    this.#body = document.querySelector('body');
    this.#content = this.createContentContainer();
    this.#projects = this.createProjectsContainer();
    this.#navbar = this.createNavbar();
    this.#newProjectButton = this.createNewProjectButton();

    this.#body.appendChild(this.#content);
    this.#content.prepend(this.#navbar);
    this.#content.appendChild(this.#projects);
    this.#projects.prepend(this.#newProjectButton);
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

  static createNewProjectButton() {
    const newProjectButton = document.createElement('button');
    newProjectButton.setAttribute('id', 'new-project-button');
    newProjectButton.classList.add('article', 'mw5', 'bg-white', 'f4', 'f3-ns', 'pa2', 'pa3-ns', 'ma3', 'flex', 'flex-column', 'items-center');
  
    const plusSign = document.createElement('span');
    plusSign.classList.add('f1');
    plusSign.innerText = '+';
  
    const addNewProject = document.createElement('span');
    addNewProject.innerText = 'Add New Project';
    
    newProjectButton.appendChild(plusSign);
    newProjectButton.appendChild(addNewProject);
  
    return newProjectButton;
  }

  static displayProject(project) {
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
    editButton.textContent = 'Edit';

    const projectTitle = document.createElement('h3');
    projectTitle.classList.add('project-title', 'card-title');
    projectTitle.textContent = project.name;

    const projectTodos = document.createElement('div');
    projectTodos.classList.add('project-todos', 'mt-4');

    projectContainer.appendChild(projectBody);
    projectBody.appendChild(projectHeader);
    projectHeader.appendChild(buttonContainer);
    buttonContainer.appendChild(editButton);
    projectHeader.appendChild(projectTitle);
    projectBody.appendChild(projectTodos);

    for(const todo of project.todoItems) {
      projectTodos.appendChild(todo.displayTodoItem());
    }

    return projectContainer;
  }
}

export { DisplayController };