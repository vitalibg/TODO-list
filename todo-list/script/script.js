import {
  getButton,
  getElement,
  getInput,
  getLabel,
  getRefactorDate,
  getTodoList,
} from "./utils.js";

const TODO_HIGHLIGHT_TIME = 1000;
const todos = getTodoList();

const wrap = appInitializing();

const controlPanel = getControlPanel();
const infoPanel = getInfoPanel();
const todoContainer = getElement("div", "todo-container");

controlPanel.append(getDeleteAllButton());
controlPanel.append(getDeleteLastButton());
const enterToDoInputField = getEnterToDoInputField();
controlPanel.append(enterToDoInputField);
controlPanel.append(getAddButton());

infoPanel.append(getAllLabel());
infoPanel.append(getCompletedLabel());
infoPanel.append(getShowAllButton());
infoPanel.append(getShowCompletedButton());
infoPanel.append(getSearchInputField());

wrap.append(controlPanel);
wrap.append(infoPanel);

refreshInitialState();

wrap.append(todoContainer);

function appInitializing() {
  const main = document.getElementById("root");
  const container = getElement("div", "container");
  const wrap = getElement("div", "wrap");
  main.append(container);
  container.append(wrap);
  return wrap;
}

function getControlPanel() {
  const controlPanel = getElement("div", "panel");
  controlPanel.classList.add("control-panel");
  return controlPanel;
}

function getInfoPanel() {
  const infoPanel = getElement("div", "info-panel");
  infoPanel.classList.add("panel");
  return infoPanel;
}

function getDeleteAllButton() {
  const deleteAllButton = getButton("Delete All");
  deleteAllButton.addEventListener("click", (event) => deleteAllHandler(event));
  return deleteAllButton;
}

function deleteAllHandler(event) {
  const todoList = event.target.parentElement.parentElement.children[2];
  while (todoList.firstChild) {
    todoList.removeChild(todoList.firstChild);
  }
  localStorage.clear();
  updateToDoCount(event);
  updateCompletedToDoCount(event);
}

function getDeleteLastButton() {
  const deleteLastButton = getButton("Delete Last");
  deleteLastButton.addEventListener("click", (event) =>
    deleteLastHandler(event),
  );
  return deleteLastButton;
}

function deleteLastHandler(event) {
  const todoList = event.target.parentElement.parentElement.children[2];
  todoList.removeChild(todoList.lastChild);
  let todosList = getTodoList();
  todosList.pop();
  localStorage.clear();
  localStorage.setItem("todos", JSON.stringify(todosList));
  updateToDoCount(event);
  updateCompletedToDoCount(event);
}

function getEnterToDoInputField() {
  const enterToDoInput = getInput("Enter todo ...", "input");
  enterToDoInput.classList.add("enter-todo");
  return enterToDoInput;
}

function getAddButton() {
  const addButton = getButton("Add");
  addButton.addEventListener("click", (event) => addHandler(event));
  return addButton;
}

function addHandler(event) {
  let todo = getToDo(enterToDoInputField.value);
  todoContainer.append(todo);
  addData(todo, event);
  enterToDoInputField.value = "";
  updateToDoCount(event);
}

function getAllLabel() {
  const allLabel = getElement("div", "all-label");
  allLabel.append(getLabel(`All: ${todos.length}`));
  return allLabel;
}

function getCompletedLabel() {
  const completedLabel = getElement("div", "completed-label");
  completedLabel.append(getLabel("Completed: 0"));
  return completedLabel;
}

function getShowAllButton() {
  const showAllButton = getButton("Show All");
  showAllButton.addEventListener("click", (event) => showAllHandler(event));
  return showAllButton;
}

function showAllHandler(event) {
  const allList = event.target.parentElement.parentElement.children[2].children;
  for (const todo of allList) {
    if (
      todo.className.includes("todo-wrap") ||
      todo.className.includes("todo-wrap completed")
    ) {
      todo.classList.remove("active");
    }
  }
}

function getShowCompletedButton() {
  const showCompletedButton = getButton("Show Completed");
  showCompletedButton.addEventListener("click", (event) =>
    showCompletedHandler(event),
  );
  return showCompletedButton;
}

function showCompletedHandler(event) {
  const completedList =
    event.target.parentElement.parentElement.children[2].children;
  for (const todo of completedList) {
    if (
      todo.className !== "todo-wrap completed" &&
      todo.className !== "todo-wrap active"
    ) {
      todo.classList.add("active");
    }
  }
}

function getSearchInputField() {
  const searchInput = getInput("Search ...", "input");
  searchInput.classList.add("search-todo");
  searchInput.addEventListener("keypress", (event) => searchToDoHandler(event));
  return searchInput;
}

function searchToDoHandler(event) {
  const searchToDo = event.target.value.toString();
  if (event.key === "Enter") {
    const todoList =
      event.target.parentElement.parentElement.children[2].getElementsByClassName(
        "todo-input",
      );
    for (const todo of todoList) {
      if (todo.textContent === searchToDo) {
        todo.parentElement.parentElement.classList.toggle("search");
        setTimeout(() => {
          todo.parentElement.parentElement.classList.toggle("search");
        }, TODO_HIGHLIGHT_TIME);
      }
    }
    event.target.value = "";
  }
}

function refreshInitialState() {
  let completedCount = 0;
  todos.forEach((todoItem) => {
    todoContainer.append(
      getToDo(todoItem.todoText, todoItem.todoData, todoItem.todoId),
    );
    if (todoItem.todoIsChecked) {
      completedCount++;
      todoContainer.lastChild.classList.toggle("completed");
      // TODO: Add realization of pressed checkbox state after page updating
      // todoContainer.lastElementChild.firstElementChild.firstElementChild.lastElementChild.classList.toggle("checked")
    }
    document.querySelector(
      ".completed-label .label",
    ).textContent = `Completed: ${completedCount}`;
  });
}

function getToDo(todoText, todoData, todoId) {
  // Checkbox
  const todo = getElement("div", "todo-wrap");
  todo.setAttribute("id", todoId || new Date().getMilliseconds());
  const todoCheckboxWrap = getElement("div", "todo-checkbox-wrap");
  const todoCheckboxContainer = getElement("label", "todo-checkbox-container");
  const todoCheckbox = getElement("input", "todo-checkbox");
  todoCheckbox.setAttribute("type", "checkbox");
  todoCheckboxContainer.append(todoCheckbox);
  todoCheckboxContainer.append(getElement("span", "checkmark"));
  todoCheckboxWrap.append(todoCheckboxContainer);
  todo.append(todoCheckboxWrap);

  // Input field
  const todoInputContainer = getElement("div", "todo-input-container");
  const todoInput = getElement("div", "todo-input");
  todoInput.textContent = todoText;
  todoInputContainer.append(todoInput);
  todo.append(todoInputContainer);

  // Close
  const todoCloseWrap = getElement("div", "todo-close-wrap");
  const todoCloseContainer = getElement("div", "todo-close-container");
  todoCloseContainer.append(getElement("div", "todo-close"));
  todoCloseWrap.append(todoCloseContainer);

  // Date
  const todoDateContainer = getElement("div", "todo-date-container");
  todoDateContainer.textContent = todoData || getRefactorDate();
  todoCloseWrap.append(todoDateContainer);
  todo.append(todoCloseWrap);
  todo.addEventListener("click", (event) => closeTodoHandler(event));
  todo.addEventListener("click", (event) => completeTodoHandler(event));
  return todo;
}

function closeTodoHandler(event) {
  const todosList = JSON.parse(localStorage.getItem("todos"));
  let completedCount = 0;
  if (event.target.className === "todo-close") {
    const titleDeletedTodo =
      event.target.parentElement.parentElement.parentElement.children[1]
        .firstChild.textContent;
    document.querySelector(".all-label .label").textContent = `All: ${
      event.target.parentElement.parentElement.parentElement.parentElement
        .children.length - 1
    }`;
    todosList.splice(
      todosList.findIndex((title) => title.todoText === titleDeletedTodo),
      1,
    );
    event.target.parentElement.parentElement.parentElement.remove();
    const completedTodoCount = document.getElementsByClassName("todo-wrap");
    for (let i = 0; i < completedTodoCount.length; i++) {
      if (completedTodoCount[i].className.includes("todo-wrap completed")) {
        completedCount++;
      }
    }
    document.querySelector(
      ".completed-label .label",
    ).textContent = `Completed: ${completedCount}`;
  }
  localStorage.clear();
  localStorage.setItem("todos", JSON.stringify(todosList));
}

function completeTodoHandler(event) {
  if (event.target.className === "checkmark") {
    event.target.parentElement.parentElement.parentElement.classList.toggle(
      "completed",
    );
    event.target.parentElement.parentElement.parentElement.children[1].classList.toggle(
      "cross-text",
    );
    event.target.parentElement.parentElement.parentElement.parentElement.parentElement.children[1].children.item(
      1,
    ).firstChild.textContent = `Completed: ${
      event.target.parentElement.parentElement.parentElement.parentElement.getElementsByClassName(
        "completed",
      ).length
    }`;

    const completedTodos = [];
    const todoList =
      event.target.parentElement.parentElement.parentElement.parentElement
        .children;
    const todosList = JSON.parse(localStorage.getItem("todos"));

    for (let i = 0; i < todoList.length; i++) {
      if (todoList[i].className.includes("todo-wrap completed")) {
        completedTodos.push(i);
      }
    }

    for (let i = 0; i < todosList.length; i++) {
      todosList[i].todoIsChecked = false;
    }

    for (let i = 0; i < todosList.length; i++) {
      for (let j = 0; j < completedTodos.length; j++) {
        if (i === completedTodos[j]) {
          todosList[i].todoIsChecked = true;
        }
      }
    }

    localStorage.clear();
    localStorage.setItem("todos", JSON.stringify(todosList));
  }
}

function updateToDoCount(event) {
  event.target.parentElement.parentElement.children[1].children.item(
    0,
  ).firstChild.textContent = `All: ${event.target.parentElement.parentElement.children[2].children.length}`;
}

function updateCompletedToDoCount(event) {
  event.target.parentElement.parentElement.children[1].children.item(
    1,
  ).firstChild.textContent = `Completed: ${
    event.target.parentElement.parentElement.children[2].getElementsByClassName(
      "completed",
    ).length
  }`;
}

function addData(todo, event) {
  const lastChild =
    event.target.parentElement.parentElement.children[2].lastChild;
  const todoId = todo.id;
  const todoData = lastChild.childNodes[2].childNodes[1].textContent;
  const todoText = lastChild.childNodes[1].firstChild.textContent;
  const todoIsChecked = false;
  const todos = getTodoList();

  todos.push({
    todoId,
    todoData,
    todoText,
    todoIsChecked,
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}