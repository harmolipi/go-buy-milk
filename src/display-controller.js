import { ListsController } from './lists-controller';

class DisplayController {
  static #body;
  static #content;
  static #lists;
  static #navbar;
  static #newListButton;
  static #newListInput;
  static #newListModal;
  static #newTodoForm;

  static initialize() {
    this.#body = document.querySelector('body');
    this.#content = this.createContentContainer();
    this.#lists = this.createListsContainer();
    this.#navbar = this.createNavbar();
    this.#newTodoForm = this.#createNewTodoForm();
    this.#newListButton = this.#createNewListButton();
    this.#newListInput = this.#createNewListInput();
    this.#newListModal = this.#createNewListModal(this.#newListForm());

    this.#body.appendChild(this.#content);
    this.#content.prepend(this.#navbar);
    this.#content.appendChild(this.#lists);
    this.#lists.prepend(this.#newListButton);
    this.#lists.appendChild(this.#newListInput);
    this.#lists.appendChild(this.#newListModal);
  }

  static updateDisplay(display = ListsController.lists) {
    this.clearLists(lists);
    const newListInput = document.querySelector('#new-list-input');
    newListInput.checked = false;

    for(const list of display) {
      let displayList = this.displayList(list)
      displayList.dataset.listId = list.id;
      this.#lists.appendChild(displayList);
    }

    this.#clearListForm();
    this.#clearTodoListForm();
    ListsController.updateEventListeners();
  }

  static clearLists(element) {
    while(element.lastChild && element.lastChild.classList.contains('list-container')) {
      element.removeChild(element.lastChild);
    }
  }

  static updateTodoList(list) {
    const listContainer = document.querySelector(`[data-list-id="${list.id}"]`);
    const todoList = listContainer.querySelector('.list-todos');
    this.clearTodoList(todoList);

    for(const todo of list.todoItems) {
      let displayTodo = this.#displayTodoItem(todo);
      displayTodo.classList.add('mv3');
      todoList.appendChild(displayTodo);
      const horizontalRule = document.createElement('hr');
      todoList.appendChild(horizontalRule);
    }

    const todoListForm = document.createElement('div');
    todoListForm.classList.add('mv5');
    todoListForm.appendChild(this.#newTodoForm);
    todoList.appendChild(todoListForm);
    this.#clearTodoListForm();
  }

  static clearTodoList(todoList) {
    while(todoList.firstChild) {
      todoList.removeChild(todoList.firstChild);
    }
  }

  static #clearListForm() {
    const newListModal = document.querySelector('#new-list-modal');
    const title = document.querySelector('#new-list-title-input');

    newListModal.scrollTo(0, 0);
    title.value = '';
  }

  static #clearTodoListForm() {
    const title = document.querySelector('#new-todo-title');
    const description = document.querySelector('#new-todo-description');
    const dueDate = document.querySelector('#new-todo-date');
    const priority = document.querySelector('#new-todo-priority');

    title.value = '';
    description.value = '';
    dueDate.value = '';
    priority.selectedIndex = 0;
  }

  static createContentContainer() {
    const content = document.createElement('div');
    content.id = 'content';
    content.classList.add('min-vh-100', 'h-100', 'ma0', 'pa0', 'paper');
    return content;
  }
  
  static createListsContainer() {
    const lists = document.createElement('div');
    lists.id = 'lists';
    lists.classList.add('flex', 'flex-wrap', 'mt3', 'pa2', 'pa3-ns');
    return lists;
  }

  static createNavbar() {
    const navbar = document.createElement('nav');
    navbar.classList.add('fixed', 'pb2');

    const navBrand = document.createElement('div');
    navBrand.classList.add('nav-brand');

    const navLink = document.createElement('a');
    navLink.classList.add('f3');
    navLink.href = '#';
    navLink.textContent = 'Go Buy Milk';

    navbar.appendChild(navBrand);
    navBrand.appendChild(navLink);

    return navbar;
  }

  static #createNewListButton() {
    const newListButton = document.createElement('div');
    newListButton.setAttribute('id', 'new-list-button2');
    newListButton.classList.add('mw5', 'pa1', 'ma3', 'flex');

    const buttonLabel = document.createElement('label');
    buttonLabel.setAttribute('for', 'new-list-input');
    buttonLabel.classList.add('paper-btn', 'bg-white', 'f4', 'f3-ns', 'flex', 'flex-column', 'items-center', 'pa2', 'pa3-ns');
  
    const plusSign = document.createElement('span');
    plusSign.classList.add('f1');
    plusSign.innerText = '+';
  
    const addNewList = document.createElement('span');
    addNewList.innerText = 'Add New List';
    
    newListButton.appendChild(buttonLabel);
    buttonLabel.appendChild(plusSign);
    buttonLabel.appendChild(addNewList);
  
    return newListButton;
  }

  static #createNewListInput() {
    const newInput = document.createElement('input');
    newInput.setAttribute('id', 'new-list-input');
    newInput.setAttribute('type', 'checkbox');
    newInput.classList.add('modal-state');

    return newInput;
  }

  static #createNewListModal(modalBody) {
    const newModalContainer = document.createElement('div');
    newModalContainer.classList.add('modal');

    const newModalLabel = document.createElement('label');
    newModalLabel.setAttribute('for', 'new-list-input');
    newModalLabel.classList.add('modal-bg');

    const newModalBody = document.createElement('div');
    newModalBody.setAttribute('id', 'new-list-modal');
    newModalBody.classList.add('modal-body', 'overflow-scroll');

    const closeLabel = document.createElement('label');
    closeLabel.setAttribute('for', 'new-list-input');
    closeLabel.classList.add('btn-close');
    closeLabel.textContent = 'X';

    newModalContainer.appendChild(newModalLabel);
    newModalContainer.appendChild(newModalBody);
    newModalBody.appendChild(closeLabel);
    
    if(modalBody) {
      newModalBody.appendChild(modalBody);
    } else {
      const modalTitle = document.createElement('h4');
      modalTitle.classList.add('modal-title');
      modalTitle.textContent = 'This is the title';

      const textContent = document.createElement('p');
      textContent.classList.add('modal-text');
      textContent.textContent = "Hello! This is a longer bit of text. It keeps going. Let's see if it wraps around.";

      newModalBody.appendChild(modalTitle);
      newModalBody.appendChild(textContent);
    }

    return newModalContainer;
  }

  static #newListForm(list) {
    const newListContainer = document.createElement('div');
    newListContainer.classList.add('new-list-container', 'ma2', 'w5', 'h5');
    newListContainer.dataset.listId = 'new';

    const listBody = document.createElement('div');
    listBody.classList.add('list-body', 'overflow-scroll');

    const listTitleContainer = document.createElement('div');
    listTitleContainer.classList.add('form-group');

    const listTitleLabel = document.createElement('label');
    listTitleLabel.setAttribute('for', 'new-list-title-input');
    listTitleLabel.setAttribute('id', 'new-list-title');
    listTitleLabel.classList.add('f2');
    listTitleLabel.textContent = 'List Title';

    const listTitle = document.createElement('input');
    listTitle.setAttribute('placeholder', 'My New List');
    listTitle.setAttribute('type', 'text');
    listTitle.setAttribute('id', 'new-list-title-input');
    if(list) { listTitle.value = list.title; }

    const listTodosHeader = document.createElement('h3');
    listTodosHeader.classList.add('nb2');
    listTodosHeader.textContent = 'Todos:';

    const listTodos = document.createElement('div');
    listTodos.classList.add('list-todos', 'mt-4');

    const todoList = document.createElement('div');

    const listSaveRow = document.createElement('div');
    listSaveRow.classList.add('row');

    const listSaveContainer = document.createElement('div');
    listSaveContainer.classList.add('col-12', 'col');

    const listSaveButton = document.createElement('button');
    listSaveButton.setAttribute('id', 'new-list-save');
    listSaveButton.classList.add('btn-block', 'btn-success');
    listSaveButton.textContent = 'Save List';

    newListContainer.appendChild(listBody);
    listBody.appendChild(listTitleContainer);
    listTitleContainer.appendChild(listTitleLabel);
    listTitleContainer.appendChild(listTitle);
    listBody.appendChild(listTodosHeader);
    listBody.appendChild(listTodos);
    listTodos.appendChild(todoList);
    todoList.appendChild(this.#newTodoForm);
    listSaveRow.appendChild(listSaveContainer);
    listSaveContainer.appendChild(listSaveButton);
    listBody.appendChild(listSaveRow);

    return newListContainer;
  }

  static #createNewTodoForm(list) {
    const todoFormContainer = document.createElement('div');
    todoFormContainer.classList.add('form-group', 'ml3');

    const todoTitle = document.createElement('input');
    todoTitle.setAttribute('placeholder', 'Todo Title');
    todoTitle.setAttribute('type', 'text');
    todoTitle.setAttribute('id', list ? `newTodoTitle${list.id}` : 'new-todo-title');
    todoTitle.style.display = 'block';
    todoTitle.classList.add('mv2');

    const todoDescription = document.createElement('textarea');
    todoDescription.setAttribute('placeholder', 'Task description');
    todoDescription.setAttribute('id', list ? `newTodoDescription${list.id}` : 'new-todo-description');
    todoDescription.classList.add('mv2');

    const dueDate = document.createElement('input');
    dueDate.setAttribute('type', 'date');
    dueDate.setAttribute('id', list ? `newTodoDate${list.id}` : 'new-todo-date');
    dueDate.style.display = 'block';
    dueDate.classList.add('mv2');

    const todoPriority = document.createElement('select');
    todoPriority.setAttribute('id', list ? `newTodoPriority${list.id}` : 'new-todo-priority');
    todoPriority.classList.add('mv2');
    
    const lowPriority = document.createElement('option');
    lowPriority.setAttribute('value', 'low');
    lowPriority.textContent = 'Low';

    const mediumPriority = document.createElement('option');
    mediumPriority.setAttribute('value', 'medium');
    mediumPriority.textContent = 'Medium';

    const highPriority = document.createElement('option');
    highPriority.setAttribute('value', 'high');
    highPriority.textContent = 'High';

    const submitTodo = document.createElement('button');
    if(list) {
      submitTodo.setAttribute('id', `updateTodo${list.id}`)
      submitTodo.dataset.listId = list.id;
    } else {
      submitTodo.setAttribute('id', 'new-todo');
    }
    if(submitTodo.id != 'new-todo') submitTodo.classList.add('update-todos');
    submitTodo.classList.add('btn-secondary', 'mv2');
    submitTodo.textContent = 'Add task';

    todoFormContainer.appendChild(todoTitle);
    todoFormContainer.appendChild(todoDescription);
    todoFormContainer.appendChild(dueDate);
    todoPriority.appendChild(lowPriority);
    todoPriority.appendChild(mediumPriority);
    todoPriority.appendChild(highPriority);
    todoFormContainer.appendChild(todoPriority);
    todoFormContainer.appendChild(submitTodo);

    return todoFormContainer;
  }

  static displayList(list) {
    const listContainer = document.createElement('div');
    listContainer.classList.add('list-container', 'card', 'ma2', 'w5', 'h5');

    const listBody = document.createElement('div');
    listBody.classList.add('list-body', 'card-body', 'overflow-scroll');

    const listTitle = document.createElement('h3');
    listTitle.classList.add('list-title', 'card-title');
    listTitle.textContent = list.name;

    const listTodos = document.createElement('div');
    listTodos.classList.add('list-todos', 'mt-4');

    const deleteListButton = document.createElement('button');
    deleteListButton.dataset.listId = list.id;
    deleteListButton.classList.add('delete-list-button', 'badge', 'danger', 'pa1', 'ma3', 'b1', 'r1');
    deleteListButton.textContent = 'Delete List';

    listContainer.appendChild(listBody);
    listBody.appendChild(listTitle);
    listBody.appendChild(listTodos);
    listBody.appendChild(deleteListButton);

    for(const todo of list.todoItems) {
      listTodos.appendChild(this.#displayTodoItem(todo));
    }

    const todoCollapsibleFormContainer = document.createElement('div');
    todoCollapsibleFormContainer.classList.add('collapsible', 'w-100');

    const todoCollapsibleFormInput = document.createElement('input');
    todoCollapsibleFormInput.setAttribute('id', `collapsibleForm${list.id}`);
    todoCollapsibleFormInput.setAttribute('type', 'checkbox');
    todoCollapsibleFormInput.setAttribute('name', 'collapsible');

    const todoOpenForm = document.createElement('label');
    todoOpenForm.setAttribute('for', `collapsibleForm${list.id}`)
    todoOpenForm.classList.add('todo-open-form');
    todoOpenForm.style.textAlign = 'left';
    todoOpenForm.textContent = 'Add another task';

    const todoFormContainer = document.createElement('div');
    todoFormContainer.classList.add('collapsible-body');

    listTodos.appendChild(todoCollapsibleFormContainer);
    todoCollapsibleFormContainer.appendChild(todoCollapsibleFormInput);
    todoCollapsibleFormContainer.appendChild(todoOpenForm);
    todoCollapsibleFormContainer.appendChild(todoFormContainer);
    todoFormContainer.appendChild(this.#createNewTodoForm(list));

    return listContainer;
  }

  static #displayTodoItem(todo) {
    const listTodo = document.createElement("div");
    listTodo.classList.add('list-todo', 'relative', 'db');
    listTodo.dataset.todoId = `${todo.list_id}-${todo.id}`;

    const todoLabelGroup = document.createElement('fieldset');
    todoLabelGroup.classList.add('form-group');

    const todoLabel = document.createElement('div');
    todoLabel.classList.add('todo-label', 'dib', 'mw-100', 'pl3', 'mv0', 'paper-check', 'flex', 'flex-nowrap', 'items-center');

    const todoInput = document.createElement('input');
    todoInput.classList.add('todo-checkbox', 'absolute', 'nl3', 'h1', 'w1');
    todoInput.type = 'checkbox';
    todoInput.dataset.listId = todo.listId;
    todoInput.dataset.todoId = todo.id;
    if (todo.completed) todoInput.checked = true;

    const todoDescription = document.createElement('span');
    todoDescription.classList.add('todo-description', 'mv1');
    todoDescription.innerText = todo.description;

    const todoInfo = document.createElement('div');
    todoInfo.classList.add('todo-info', 'mv1');

    listTodo.appendChild(todoLabel);
    todoLabel.appendChild(todoInput);

    todoLabel.appendChild(this.#displayCollapsibleTodo(todo));

    return listTodo;
  }

  static #displayCollapsibleTodo(todo) {
    const todoCollapsibleContainer = document.createElement('div');
    todoCollapsibleContainer.classList.add('collapsible', 'w-100');

    const todoCollapsibleInput = document.createElement('input');
    todoCollapsibleInput.setAttribute('id', `collapsible${todo.listId}${todo.id}`);
    todoCollapsibleInput.setAttribute('type', 'checkbox');
    todoCollapsibleInput.setAttribute('name', 'collapsible');

    const todoTitle = document.createElement('label');
    todoTitle.setAttribute('for', `collapsible${todo.listId}${todo.id}`)
    todoTitle.classList.add('todo-title');
    todoTitle.style.textAlign = 'left';

    const todoTitleText = document.createElement('span');
    todoTitleText.classList.add('todo-title-text', 'f3', 'mr4');
    todoTitleText.textContent = todo.title;

    const todoDate = document.createElement('span');
    todoDate.classList.add('todo-date', 'f6');
    todoDate.textContent = todo.dueDate

    const todoDescriptionContainer = document.createElement('div');
    todoDescriptionContainer.classList.add('collapsible-body');

    const todoDescription = document.createElement('span');
    todoDescription.classList.add('todo-description', 'mv1');
    todoDescription.textContent = todo.description;

    const deleteTodoButton = document.createElement('button');
    deleteTodoButton.dataset.listId = todo.listId;
    deleteTodoButton.dataset.todoId = todo.id;
    deleteTodoButton.classList.add('delete-button', 'badge', 'danger', 'pa1', 'absolute', 'top-1', 'right-0');
    deleteTodoButton.textContent = 'Delete';

    todoCollapsibleContainer.appendChild(todoCollapsibleInput);
    todoCollapsibleContainer.appendChild(todoTitle);
    todoTitle.appendChild(todoTitleText);
    todoTitle.appendChild(document.createElement('br'));
    todoTitle.appendChild(todoDate);
    todoCollapsibleContainer.appendChild(todoDescriptionContainer);
    todoDescriptionContainer.appendChild(deleteTodoButton);
    todoDescriptionContainer.appendChild(todoDescription);

    switch(todo.priority) {
      case 'high':
        todoTitleText.classList.add('red');
        break;
      case 'medium':
        todoTitleText.classList.add('gold');
        break;
      case 'low':
        todoTitleText.classList.add('green');
        break;
    }

    return todoCollapsibleContainer;
  }
}

export { DisplayController };