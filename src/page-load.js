import { displayNewProjectButton } from './new-project-button-module';
import { Project } from './project-module';
import { TodoItem } from './todo-item-module';

const pageLoad = () => {
  const myTodo = new TodoItem('test title', 'test description', 'test due data', 'test priority', 'Medium', true);
  const myProject = new Project('Project title', 'Project description');
  myProject.addTodo(myTodo);
  const myTodoDom = myTodo.displayTodoItem();
  const todoList = document.querySelector('.project-todos');
  const projects = document.querySelector('#projects');
  projects.prepend(displayNewProjectButton());
  todoList.appendChild(myTodoDom);
  projects.appendChild(myProject.displayProject());
};

export default pageLoad;