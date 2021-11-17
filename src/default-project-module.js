import { Project } from './project-module';
import { TodoItem } from './todo-item-module';

const newProject = () => {
  const newProject = new Project('New Project', 'new');
  return newProject;
}

const generateDefault = () => {
  const defaultProject = new Project('Default Project');

  return [defaultProject];
};

const generateDevDefault = () => {
  const myProject1 = new Project('Project title');
  const myProject2 = new Project('Another project');
  const myProject3 = new Project('Project title');
  const myTodo1 = new TodoItem('test title', 'test description', 'test due date', 'medium', true);
  const myTodo2 = new TodoItem('Title', 'This is the description of this todo', 'Due date', 'high', false);
  const myTodo3 = new TodoItem("Here's another task", 'This task will entail many things that need to be done.', 'Due date', 'low', true);
  
  myProject1.addTodo(myTodo1);
  myProject2.addTodo(myTodo2);
  myProject2.addTodo(myTodo3);
  myProject2.addTodo(myTodo1);
  myProject3.addTodo(myTodo3);

  return [myProject1, myProject2, myProject3];
};

export { newProject, generateDefault, generateDevDefault };