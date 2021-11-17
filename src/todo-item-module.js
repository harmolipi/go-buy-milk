class TodoItem {
  title;
  description;
  dueDate;
  priority;
  completed;

  constructor(title, description, dueDate, priority, completed) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.completed = completed;
  }
}

export { TodoItem };