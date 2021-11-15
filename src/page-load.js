import { displayNewProjectButton } from './new-project-button-module';
import { display } from './display-project-module';
import { TodoItem } from './todo-item-module';

const pageLoad = () => {
  const myTodo = new TodoItem('test title', 'test description', 'test due data', 'test priority', 'Medium', true);
  const myTodoDom = myTodo.displayTodoItem();
  const todoList = document.querySelector('.project-todos');
  const projects = document.querySelector('#projects');
  projects.prepend(displayNewProjectButton());
  todoList.appendChild(myTodoDom);
  projects.appendChild(display('New Project', myTodo.displayTodoItem()));
};

export default pageLoad;