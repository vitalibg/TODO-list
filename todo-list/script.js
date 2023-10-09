const DELETE_ALL_TEXT = "Delete All";
const DELETE_LAST_TEXT = "Delete Last";
const ADD_TEXT = "Add";
const SHOW_ALL_TEXT = "Show All";
const SHOW_COMPLETED_TEXT = "Show Completed";
const TODO_HIGHLIGHT_TIME = 1000

const main = document.getElementById("root");
const container = getElement("div", "container");
const wrap = getElement("div", "wrap");

main.append(container);
container.append(wrap);

const controlPanel = getElement("div", "control-panel");
controlPanel.classList.add("panel");
const deleteAllButton = getButton(DELETE_ALL_TEXT);
deleteAllButton.addEventListener("click", (event) => {
  const todoList = event.target.parentElement.parentElement.children[2];
  while (todoList.firstChild) {
    todoList.removeChild(todoList.firstChild);
  }
  updateToDoCount(event);
});
controlPanel.append(deleteAllButton);
const deleteLastButton = getButton(DELETE_LAST_TEXT);
deleteLastButton.addEventListener("click", (event) => {
  const todoList = event.target.parentElement.parentElement.children[2];
  todoList.removeChild(todoList.lastChild);
  updateToDoCount(event);
});
controlPanel.append(deleteLastButton);
const enterToDoInput = getInput("Enter todo ...", "input");
enterToDoInput.classList.add("enter-todo");
controlPanel.append(enterToDoInput);
const addButton = getButton(ADD_TEXT);
addButton.addEventListener("click", (event) => {
  todoContainer.append(getToDo(enterToDoInput.value));
  enterToDoInput.value = "";
  updateToDoCount(event);
});
controlPanel.append(addButton);

const infoPanel = getElement("div", "info-panel");
infoPanel.classList.add("panel");
const allLabel = getElement("div", "all-label");
allLabel.append(getLabel("All: 0"));
infoPanel.append(allLabel);
const completedLabel = getElement("div", "completed-label");
completedLabel.append(getLabel("Completed: 0"));
infoPanel.append(completedLabel);
const showAllButton = getButton(SHOW_ALL_TEXT);
showAllButton.addEventListener("click", (event) => {
  const allList = event.target.parentElement.parentElement.children[2].children;
  for (const todo of allList) {
    if (
      todo.className.includes("todo-wrap") ||
      todo.className.includes("todo-wrap completed")
    ) {
      todo.classList.remove("active");
    }
  }});
infoPanel.append(showAllButton);
const showCompletedButton = getButton(SHOW_COMPLETED_TEXT);
showCompletedButton.addEventListener("click", (event) => {
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
});
infoPanel.append(showCompletedButton);
const searchInput = getInput("Search ...", "input");
searchInput.classList.add("search-todo");
searchInput.addEventListener("keypress", (event) => {
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
});
infoPanel.append(searchInput);

wrap.append(controlPanel);
wrap.append(infoPanel);

const todoContainer = getElement("div", "todo-container");

wrap.append(todoContainer);

function getToDo(todoText) {
  const todo = getElement("div", "todo-wrap");
  const todoCheckboxWrap = getElement("div", "todo-checkbox-wrap");
  const todoCheckboxContainer = getElement("label", "todo-checkbox-container",);
  const todoCheckbox = getElement("input", "todo-checkbox");
  todoCheckbox.setAttribute("type", "checkbox");
  const todoCheckmark = getElement("span", "checkmark");
  todoCheckboxContainer.append(todoCheckbox);
  todoCheckboxContainer.append(todoCheckmark);
  todoCheckboxWrap.append(todoCheckboxContainer);
  todo.append(todoCheckboxWrap);


  const todoInputContainer = getElement("div", "todo-input-container");
  const todoInput = getElement("div", "todo-input");
  todoInput.textContent = todoText;
  todoInputContainer.append(todoInput);
  todo.append(todoInputContainer);

  const todoCloseContainer = getElement("div", "todo-close-container");
  const todoClose = getElement("div", "todo-close");
  const todoCloseImage = getElement("div", "close");
  todoCloseImage.addEventListener("click", (event) => {
    let allElement = event.target.parentElement.parentElement.parentElement.parentElement.parentElement.children[1].children.item(0).firstChild;
    allElement.textContent = `All: ${event.target.parentElement.parentElement.parentElement.parentElement.children.length - 1}`;
    let completedElement = event.target.parentElement.parentElement.parentElement.parentElement.parentElement.children[1].children[1].children.item(0).firstChild;
    if (event.target.parentElement.parentElement.parentElement.parentElement.getElementsByClassName("completed",).length - 1 <= 0) {
      completedElement.textContent = "Completed: 0";
    }
    completedElement.textContent = `Completed: ${event.target.parentElement.parentElement.parentElement.parentElement.getElementsByClassName("completed",).length - 1}`;
  });
  todoClose.append(todoCloseImage);

  const todoDateContainer = getElement("div", "todo-date-container");
  todoDateContainer.textContent = getRefactorDate();
  todoCloseContainer.append(todoClose);
  todoCloseContainer.append(todoDateContainer);
  todo.append(todoCloseContainer);
  todo.addEventListener("click", (event) => {
    if (event.target.className === "close") {
      event.target.parentElement.parentElement.parentElement.remove();
    }
  });
  todo.addEventListener("click", (event) => {
    if (event.target.className === "checkmark") {
      event.target.parentElement.parentElement.parentElement.classList.toggle("completed",);
      event.target.parentElement.parentElement.parentElement.children[1].classList.toggle("cross-text",);
      let completedLabel = event.target.parentElement.parentElement.parentElement.parentElement.parentElement.children[1].children.item(1).firstChild;
      completedLabel.textContent = `Completed: ${event.target.parentElement.parentElement.parentElement.parentElement.getElementsByClassName("completed",).length}`;
    }
  });
  return todo;
}

function getRefactorDate() {
  let date = new Date();
  let dateStr =
    ("00" + (date.getMonth() + 1)).slice(-2) +
    "/" +
    ("00" + date.getDate()).slice(-2) +
    "/" +
    date.getFullYear() +
    " " +
    ("00" + date.getHours()).slice(-2) +
    ":" +
    ("00" + date.getMinutes()).slice(-2) +
    ":" +
    ("00" + date.getSeconds()).slice(-2);
  return dateStr;
}

function getElement(tagName, className) {
  const element = document.createElement(tagName);
  element.classList.add(className);
  return element;
}

function getButton(buttonTextContent) {
  const button = getElement("a", "button");
  button.textContent = buttonTextContent;
  button.setAttribute("type", "submit");
  button.setAttribute("href", "#");
  return button;
}

function getLabel(text) {
  const label = getElement("label", "label");
  label.innerText = text;
  return label;
}

function getInput(placeholder, className) {
  const input = getElement("input", className);
  input.setAttribute("type", "text");
  input.setAttribute("placeholder", placeholder);
  return input;
}

function updateToDoCount(event) {
  let element = event.target.parentElement.parentElement.children[1].children.item(0).firstChild;
  element.textContent = `All: ${event.target.parentElement.parentElement.children[2].children.length}`;
}
