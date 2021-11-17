class TodoItem {
  title;
  description;
  dueDate;
  priority;
  completed;
  id;
  project_id;

  constructor(title, description, dueDate, priority, completed, project_id, id) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.completed = completed;
    this.project_id = project_id;
    this.id = id;
  }
}

export { TodoItem };