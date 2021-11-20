class TodoItem {
  title;
  description;
  dueDate;
  priority;
  completed;
  id;
  projectId;

  constructor(title, description, dueDate, priority, completed, projectId, id) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.completed = completed;
    this.projectId = projectId;
    this.id = id;
  }
}

export { TodoItem };