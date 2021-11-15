import { display } from './display-project-module';
import { TodoItem } from './todo-item-module';

const pageLoad = () => {
  const myTodo = new TodoItem('test title', 'test description', 'test due data', 'test priority', 'Medium', true);
  const myTodoDom = myTodo.displayTodoItem();
  const todoList = document.querySelector('.project-todos');
  todoList.appendChild(myTodoDom);
  const projects = document.querySelector('#projects');
  projects.appendChild(display('New Project', myTodo.displayTodoItem()));
};

export default pageLoad;