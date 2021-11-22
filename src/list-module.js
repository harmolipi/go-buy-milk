class List {
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

  removeTodo(todoId) {
    this.todoItems.splice(todoId, 1);
    this.updateTodoList();
  }

  updateTodoList() {
    const tempTodos = [...this.todoItems];
    this.#clearTodos();
    tempTodos.forEach((todo, index) => {
      todo.listId = this.id;
      todo.id = index;
      this.todoItems.push(todo);
    });
  }

  #clearTodos() {
    this.todoItems = [];
  }
}

export default List;
