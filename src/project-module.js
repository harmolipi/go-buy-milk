class Project {
  name;
  todoItems;

  constructor(name) {
    this.name = name;
    this.todoItems = [];
  }

  addTodo(todo) {
    this.todoItems.push(todo);
  }
}

export { Project };