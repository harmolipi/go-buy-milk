import { displayNavbar } from './display-nav';
import { displayNewProjectButton } from './new-project-button-module';
import { Project } from './project-module';
import { TodoItem } from './todo-item-module';

const pageLoad = () => {
  const content = document.querySelector('#content');
  const myTodo1 = new TodoItem('test title', 'test description', 'test due data', 'test priority', 'Medium', true);
  const myTodo2 = new TodoItem('Title', 'This is the description of this todo', 'Due date', 'medium', false);
  const myTodo3 = new TodoItem("Here's another task", 'This task will entail many things that need to be done.', 'Due date', 'Priority', true);
  const myProject1 = new Project('Project title', 'Project description');
  const myProject2 = new Project('Another project', 'This is a great project.');

  const projects = document.createElement('div');
  projects.classList.add('flex', 'flex-wrap', 'pa2', 'pa3-ns');
  projects.id = 'projects';

  myProject1.addTodo(myTodo1);
  myProject2.addTodo(myTodo2);
  myProject2.addTodo(myTodo3);
  myProject2.addTodo(myTodo1);
  content.appendChild(displayNavbar());
  content.appendChild(projects);
  projects.append(displayNewProjectButton());
  projects.appendChild(myProject1.displayProject());
  projects.appendChild(myProject2.displayProject());
};

export default pageLoad;