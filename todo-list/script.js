const rootId = document.getElementById("root");
const container = getElement("div", "container");
const wrap = getElement("div", "wrap");

rootId.append(container);
container.append(wrap);

const controlPanel = getElement("div", "panel");
controlPanel.classList.add("control-panel");
controlPanel.append(getButton("Delete All"));
controlPanel.append(getButton("Delete Last"));
const enterToDoInput = getInput("Enter todo ...", "input");
enterToDoInput.classList.add("enter-todo");
controlPanel.append(enterToDoInput);
controlPanel.append(getButton("Add"));

const infoPanel = getElement("div", "panel");
infoPanel.classList.add("info-panel");
const allLabel = getElement("div", "all-label");
allLabel.append(getLabel("All: 2"));
infoPanel.append(allLabel);
const completedLabel = getElement("div", "completed-label");
completedLabel.append(getLabel("Completed: 1"));
infoPanel.append(completedLabel);
infoPanel.append(getButton("Show All"));
infoPanel.append(getButton("Show Completed"));
const searchInput = getInput("Search ...", "input");
searchInput.classList.add("search-todo");
infoPanel.append(searchInput);

wrap.append(controlPanel);
wrap.append(infoPanel);

const todoContainer = getElement("div", "todo-container");
todoContainer.append(getToDo());

wrap.append(todoContainer);

function getToDo() {
  const todoItem = getElement("div", "todo-wrap");
  const todoItemLeft = getElement("div", "todo-left");
  const todoCheckboxContainer = getElement(
    "label",
    "todo-left__checkbox-container",
  );
  const todoCheckboxInput = getElement("input", "todo-left__checkbox");
  todoCheckboxInput.setAttribute("type", "checkbox");
  const todoCheckboxSpan = getElement("span", "checkmark");
  todoCheckboxContainer.append(todoCheckboxInput);
  todoCheckboxContainer.append(todoCheckboxSpan);
  todoItemLeft.append(todoCheckboxContainer);
  todoItem.append(todoItemLeft);

  const todoItemCenter = getElement("div", "todo-center");
  const todoInput = getInput("Todo text", "input");
  todoInput.classList.add("todo-center__input");
  todoItemCenter.append(todoInput);
  todoItem.append(todoItemCenter);

  const todoItemRight = getElement("div", "todo-right");
  const todoClose = getElement("div", "todo-right__close");
  const todoCloseImage = getElement("div", "close");
  todoClose.append(todoCloseImage);
  const todoDate = getElement("input", "input");
  todoDate.classList.add("todo-right__date");
  todoDate.setAttribute("type", "date");
  todoDate.setAttribute("placeholder", "Date");
  todoItemRight.append(todoClose);
  todoItemRight.append(todoDate);
  todoItem.append(todoItemRight);
  return todoItem;
}

function getElement(tagName, className) {
  const element = document.createElement(tagName);
  element.classList.add(className);
  return element;
}

function getButton(text) {
  const button = getElement("a", "button");
  button.innerText = text;
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
