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
    this.#setDevDefaults();
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
      this.#projects.push(project);
      project.id = this.#projects.length - 1;
      project.updateTodoList();
    });
    this.updateEventListeners();
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
    const newTodoButton = document.querySelector("#new-todo");
    const saveNewProjectButton = document.querySelector("#new-project-save");
    newTodoButton.addEventListener("click", (e) => this.#addTodoToNewProject(e));
    saveNewProjectButton.addEventListener("click", (e) => this.#saveNewProject(e));
    this.updateEventListeners();
  }

  static updateEventListeners() {
    const deleteTodoButtons = document.querySelectorAll('.delete-button');
    const updateTodoButtons = document.querySelectorAll('.update-todos');
    if(deleteTodoButtons) deleteTodoButtons.forEach(button => button.addEventListener('click', (e) => this.#deleteTodoItem(e)));
    if(updateTodoButtons) updateTodoButtons.forEach(button => button.addEventListener('click', (e) => this.#addTodoItem(e)));
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

  static #deleteTodoItem(e) {
    e.preventDefault();
    const project = this.#projects[e.currentTarget.dataset.projectId];
    project.removeTodo(e.currentTarget.dataset.todoId);
    this.#updateProjects();
    DisplayController.updateDisplay(this.#projects);
  }

  static #addTodoItem(e) {
    e.preventDefault();
    const project = this.#projects[e.currentTarget.dataset.projectId];
    const newTodoTitle = document.querySelector(`#newTodoTitle${project.id}`).value;
    const newTodoDescription = document.querySelector(`#newTodoDescription${project.id}`).value;
    const newTodoDate = document.querySelector(`#newTodoDate${project.id}`).value;
    const newTodoPriority = document.querySelector(`#newTodoPriority${project.id}`).value;
    const newTodo = new TodoItem(newTodoTitle, newTodoDescription, newTodoDate, newTodoPriority, false, project.id);
    
    project.addTodo(newTodo);
    this.#updateProjects();
    DisplayController.updateDisplay(this.#projects);
  }
}

export { ProjectsController };