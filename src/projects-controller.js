import { generateDefault } from "./default-project-module";

class ProjectsController {
  static #projects;

  static initialize() {
    this.#projects = [];
    this.#setDevDefaults();
  }

  static addProject(project) {
    this.#projects.push(project);
  }

  static get projects() {
    return this.#projects.slice();
  }

  static #setDevDefaults() {
    this.#projects = [...generateDefault()];
  };
}

export { ProjectsController };