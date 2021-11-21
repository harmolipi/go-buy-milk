import { newList, generateDevDefault } from "./default-list-module";
import { TodoItem } from "./todo-item-module";
import { List } from "./list-module";
import { DisplayController } from "./display-controller";

class ListsController {
  static #lists;
  static #newList;

  static initialize() {
    this.#lists = [];
    this.#loadLists();
    this.#newList = newList();
    // this.#setDevDefaults(); // For development testing
    this.#updateLists();
    this.#setEventListeners();
  }

  static addList(list) {
    this.#lists.push(list);
    this.#updateLists();
  }

  static get lists() {
    return this.#lists.slice();
  }

  static #updateLists() {
    if(this.#lists.length > 0) {
      let tempLists = this.#lists.slice();
      this.#clearLists();
      tempLists.forEach((list) => {
        this.#lists.push(list);
        list.id = this.#lists.length - 1;
        list.updateTodoList();
      });
    }
    this.#saveLists();
    this.updateEventListeners();
  }

  static #saveLists() {
    localStorage.setItem('lists', JSON.stringify(this.#lists));
  }

  static #loadLists() {
    const lists = JSON.parse(localStorage.getItem('lists'));
    if(lists) {
      lists.forEach((list) => {
        let newList = new List(list.name, list.id);
        list.todoItems.forEach((todo) => {
          let newTodo = new TodoItem(todo.title, todo.description, todo.dueDate, todo.priority, todo.completed, todo.listId, todo.id);
          newList.addTodo(newTodo);
        });
        this.addList(newList);
      });
    }
  }

  static #clearLists() {
    this.#lists = [];
  }

  static #setDefault() {
    this.#lists = [...generateDefault()];
  }

  static #setDevDefaults() {
    this.#lists = [...generateDevDefault()];
  }

  static #setEventListeners() {
    const newTodoButton = document.querySelector("#new-todo");
    const saveNewListButton = document.querySelector("#new-list-save");
    newTodoButton.addEventListener("click", (e) => this.#addTodoToNewList(e));
    saveNewListButton.addEventListener("click", (e) => this.#saveNewList(e));
    this.updateEventListeners();
  }

  static updateEventListeners() {
    const deleteListButtons = document.querySelectorAll(".delete-list-button");
    const deleteTodoButtons = document.querySelectorAll('.delete-button');
    const updateTodoButtons = document.querySelectorAll('.update-todos');
    const todoCheckboxes = document.querySelectorAll('.todo-checkbox');
    if(deleteListButtons) deleteListButtons.forEach(button => button.addEventListener('click', (e) => this.#deleteList(e)));
    if(deleteTodoButtons) deleteTodoButtons.forEach(button => button.addEventListener('click', (e) => this.#deleteTodoItem(e)));
    if(updateTodoButtons) updateTodoButtons.forEach(button => button.addEventListener('click', (e) => this.#addTodoItem(e)));
    if(todoCheckboxes) todoCheckboxes.forEach(checkbox => checkbox.addEventListener('change', (e) => this.#toggleTodoCompleted(e)));
  }

  static #deleteList(e) {
    e.preventDefault();
    this.#lists.splice(e.currentTarget.dataset.listId, 1);
    this.#updateLists();
    DisplayController.updateDisplay(this.#lists);
  }

  static #addTodoToNewList(e) {
    e.preventDefault();
    const newTodoTitle = document.querySelector("#new-todo-title").value;
    const newTodoDescription = document.querySelector("#new-todo-description").value;
    const newTodoDate = document.querySelector("#new-todo-date").value;
    const newTodoPriority = document.querySelector("#new-todo-priority").value;
    const newTodo = new TodoItem(newTodoTitle, newTodoDescription, newTodoDate, newTodoPriority, false, this.#newList.id);
    
    this.#newList.addTodo(newTodo);
    DisplayController.updateTodoList(this.#newList);
  }

  static #saveNewList(e) {
    e.preventDefault();
    const newListTitle = document.querySelector("#new-list-title-input").value;
    this.#newList.name = newListTitle;
    this.#lists.push(this.#newList);
    this.#newList = newList();
    this.#updateLists();
    DisplayController.updateDisplay(this.#lists);
  }

  static #deleteTodoItem(e) {
    e.preventDefault();
    const list = this.#lists[e.currentTarget.dataset.listId];
    list.removeTodo(e.currentTarget.dataset.todoId);
    this.#updateLists();
    DisplayController.updateDisplay(this.#lists);
  }

  static #toggleTodoCompleted(e) {
    e.preventDefault();
    const list = this.#lists[e.currentTarget.dataset.listId];
    const todo = list.todoItems[e.currentTarget.dataset.todoId];
    todo.completed = e.currentTarget.checked;
    this.#updateLists();
    DisplayController.updateDisplay(this.#lists);
  }

  static #addTodoItem(e) {
    e.preventDefault();
    const list = this.#lists[e.currentTarget.dataset.listId];
    const newTodoTitle = document.querySelector(`#newTodoTitle${list.id}`).value;
    const newTodoDescription = document.querySelector(`#newTodoDescription${list.id}`).value;
    const newTodoDate = document.querySelector(`#newTodoDate${list.id}`).value;
    const newTodoPriority = document.querySelector(`#newTodoPriority${list.id}`).value;
    const newTodo = new TodoItem(newTodoTitle, newTodoDescription, newTodoDate, newTodoPriority, false, list.id);
    
    list.addTodo(newTodo);
    this.#updateLists();
    DisplayController.updateDisplay(this.#lists);
  }
}

export { ListsController };