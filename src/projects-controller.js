import { newProject, generateDefault, generateDevDefault } from "./default-project-module";
import { TodoItem } from "./todo-item-module";
import { DisplayController } from "./display-controller";

class ProjectsController {
  static #projects;
  static #newProject;

  static initialize() {
    this.#projects = [];
    this.#newProject = newProject();
    // this.#setDefault();
    // this.#setDevDefaults();
    this.#updateProjects();
    this.#setEventListeners();
  }

  static addProject(project) {
    this.#projects.push(project);
    this.#updateProjects();
  }

  static get projects() {
    return this.#projects.slice();
  }

  static #updateProjects() {
    let tempProjects = this.#projects.slice();
    this.#clearProjects();
    tempProjects.forEach((project) => {
      project.updateTodoList();
      this.#projects.push(project);
      project.id = this.#projects.length - 1;
    });
  }

  static #clearProjects() {
    this.#projects = [];
  }

  static #setDefault() {
    this.#projects = [...generateDefault()];
  }

  static #setDevDefaults() {
    this.#projects = [...generateDevDefault()];
  }

  static #setEventListeners() {
    const newProjectButton = document.querySelector("#new-project-button");
    const newTodoButton = document.querySelector("#new-todo");
    const saveNewProjectButton = document.querySelector("#new-project-save");
    const editButtons = document.querySelectorAll(".edit-button");
    newProjectButton.addEventListener("click", (e) => this.#setNewProjectModal(e));
    // newTodoButton.addEventListener("click", (e) => this.#addTodoToNewProject(e));
    // saveNewProjectButton.addEventListener("click", (e) => this.#saveNewProject(e));
    // editButtons.forEach(editButton => {
    //   editButton.addEventListener("click", (e) => this.#editProject(e));
    // })
  }

  static updateProjectEventListeners() {
    console.log('updating project event listeners');
    const projectLabels = document.querySelectorAll(".project-labels");
    if(projectLabels) {
      console.log(projectLabels);
      projectLabels.forEach(projectLabel => projectLabel.addEventListener("click", (e) => this.#setEditProjectModal(e)));
    }
  }

  static #setNewProjectModal(e) {
    DisplayController.changeModalContents(DisplayController.newProjectForm());
    const newTodoButton = document.querySelector("#new-todo");
    const saveNewProjectButton = document.querySelector("#new-project-save");
    newTodoButton.addEventListener("click", (e) => this.#addTodoToNewProject(e));
    saveNewProjectButton.addEventListener("click", (e) => this.#saveNewProject(e));
  }

  static #setEditProjectModal(e) {
    const projectId = e.target.dataset.projectId;
    const project = this.#projects[projectId];
    console.log('setting edit project modal');
    console.log(`project:`);
    console.log(project);
    DisplayController.changeModalContents(DisplayController.newProjectForm(project));
    const newTodoButton = document.querySelector("#new-todo");
    const saveNewProjectButton = document.querySelector("#new-project-save");
    newTodoButton.addEventListener("click", (e) => this.#addTodoToNewProject(e));
    saveNewProjectButton.addEventListener("click", (e) => this.#saveNewProject(e));
    console.log('finished setting edit project modal');
    // DisplayController.createNewProjectModal(project);
    // DisplayController.updateProjectDisplay(project);
  }

  static #addTodoToNewProject(e) {
    e.preventDefault();
    const newTodoTitle = document.querySelector("#new-todo-title").value;
    const newTodoDescription = document.querySelector("#new-todo-description").value;
    const newTodoDate = document.querySelector("#new-todo-date").value;
    const newTodoPriority = document.querySelector("#new-todo-priority").value;
    const newTodo = new TodoItem(newTodoTitle, newTodoDescription, newTodoDate, newTodoPriority, false, this.#newProject.id);
    
    this.#newProject.addTodo(newTodo);
    DisplayController.updateTodoList(this.#newProject);
  }

  static #saveNewProject(e) {
    e.preventDefault();
    const newProjectTitle = document.querySelector("#new-project-title-input").value;
    this.#newProject.name = newProjectTitle;
    this.#projects.push(this.#newProject);
    this.#newProject = newProject();
    this.#updateProjects();
    DisplayController.updateDisplay(this.#projects);
  }

  static #editProject(e) {
    e.preventDefault();
    const projectId = e.target.dataset.projectId;
    const project = this.#projects[projectId];
    DisplayController.createNewProjectModal(project);
    DisplayController.updateProjectDisplay(project);
    // TODO: turn each edit button into a modal input button and append all the different modal boxes
    // to each project card, or elsewhere on the main page
  }
}

export { ProjectsController };