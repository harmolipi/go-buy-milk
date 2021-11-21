import { List } from './list-module';
import { TodoItem } from './todo-item-module';

const newList = () => {
  const newList = new List('New List', 'new');
  return newList;
};

const generateDevDefault = () => {
  const myList1 = new List('List title', 0);
  const myList2 = new List('Another list', 1);
  const myTodo1 = new TodoItem('test title', 'test description', 'test due date', 'medium', true, 0, 0);
  const myTodo2 = new TodoItem('Title', 'This is the description of this todo', 'Due date', 'high', false, 1, 0);
  const myTodo3 = new TodoItem("Here's another task", 'This task will entail many things that need to be done.', 'Due date', 'low', true, 1, 1);
  
  myList1.addTodo(myTodo1);
  myList2.addTodo(myTodo2);
  myList2.addTodo(myTodo3);

  return [myList1, myList2];
};

export { newList, generateDevDefault };