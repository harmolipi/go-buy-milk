class Project {
  name;
  id;
  todoItems;

  constructor(name, id) {
    this.name = name;
    this.id = id;
    this.todoItems = [];
  }

  addTodo(todo) {
    this.todoItems.push(todo);
    this.updateTodoList();
  }

  updateTodoList() {
    let tempTodos = this.todoItems.slice();
    this.#clearTodos();
    tempTodos.forEach((todo) => {
      todo.project_id = this.id;
      this.todoItems.push(todo);
      todo.id = this.todoItems.length - 1;
    });
  }

  #clearTodos() {
    this.todoItems = [];
  }
}

export { Project };