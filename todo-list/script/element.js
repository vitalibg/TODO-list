import {
  addHandler,
  closeTodoHandler,
  completeTodoHandler,
  deleteAllHandler,
  deleteLastHandler,
  searchToDoHandler,
  showAllHandler,
  showCompletedHandler,
} from "./handler.js";
import { getDate } from "./utils.js";

export function getWrap() {
  const main = document.getElementById("root");
  const container = getElement("div", "container");
  const wrap = getElement("div", "wrap");
  main.append(container);
  container.append(wrap);
  return wrap;
}

export function getControlPanel() {
  const controlPanel = getElement("div", "panel");
  controlPanel.classList.add("control-panel");
  return controlPanel;
}

export function getInfoPanel() {
  const infoPanel = getElement("div", "info-panel");
  infoPanel.classList.add("panel");
  return infoPanel;
}

export function getDeleteAllButton() {
  const deleteAllButton = getButton("Delete All");
  deleteAllButton.addEventListener("click", (event) => deleteAllHandler(event));
  return deleteAllButton;
}

export function getDeleteLastButton() {
  const deleteLastButton = getButton("Delete Last");
  deleteLastButton.addEventListener("click", (event) =>
    deleteLastHandler(event),
  );
  return deleteLastButton;
}

export function getEnterToDoInputField() {
  const enterToDoInput = getInput("Enter todo ...", "input");
  enterToDoInput.classList.add("enter-todo");
  return enterToDoInput;
}

export function getAddButton() {
  const addButton = getButton("Add");
  addButton.addEventListener("click", (event) => addHandler(event));
  return addButton;
}

export function getCompletedLabel() {
  const completedLabel = getElement("div", "completed-label");
  completedLabel.append(getLabel("Completed: 0"));
  return completedLabel;
}

export function getShowAllButton() {
  const showAllButton = getButton("Show All");
  showAllButton.addEventListener("click", (event) => showAllHandler(event));
  return showAllButton;
}

export function getShowCompletedButton() {
  const showCompletedButton = getButton("Show Completed");
  showCompletedButton.addEventListener("click", (event) =>
    showCompletedHandler(event),
  );
  return showCompletedButton;
}

export function getSearchInputField() {
  const searchInput = getInput("Search ...", "input");
  searchInput.classList.add("search-todo");
  searchInput.addEventListener("keypress", (event) => searchToDoHandler(event));
  return searchInput;
}

export function getAllLabel(todoLength) {
  const allLabel = getElement("div", "all-label");
  allLabel.append(getLabel(`All: ${todoLength}`));
  return allLabel;
}

export function getToDo(todoText, todoData, todoId) {
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
  todoDateContainer.textContent = todoData || getDate();
  todoCloseWrap.append(todoDateContainer);
  todo.append(todoCloseWrap);
  todo.addEventListener("click", (event) => closeTodoHandler(event));
  todo.addEventListener("click", (event) => completeTodoHandler(event));
  return todo;
}

export function getElement(tagName, className) {
  const element = document.createElement(tagName);
  element.classList.add(className);
  return element;
}

export function getButton(buttonTextContent) {
  const button = getElement("a", "button");
  button.textContent = buttonTextContent;
  button.setAttribute("type", "submit");
  button.setAttribute("href", "#");
  return button;
}

export function getLabel(text) {
  const label = getElement("label", "label");
  label.innerText = text;
  return label;
}

export function getInput(placeholder, className) {
  const input = getElement("input", className);
  input.setAttribute("type", "text");
  input.setAttribute("placeholder", placeholder);
  return input;
}

export const todoContainer = getElement("div", "todo-container");

export const enterToDoInputField = getEnterToDoInputField();
