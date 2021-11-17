import { generateDefault, generateDevDefault } from "./default-project-module";

class ProjectsController {
  static #projects;

  static initialize() {
    this.#projects = [];
    this.#setDevDefaults();
    this.#updateProjects();
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
    });
  }

  static #clearProjects() {
    this.#projects = [];
  }

  static #setDevDefaults() {
    this.#projects = [...generateDevDefault()];
  }
}

export { ProjectsController };