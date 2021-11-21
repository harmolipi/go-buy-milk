class TodoItem {
  title;
  description;
  dueDate;
  priority;
  completed;
  id;
  listId;

  constructor(title, description, dueDate, priority, completed, listId, id) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.completed = completed;
    this.listId = listId;
    this.id = id;
  }
}

export { TodoItem };