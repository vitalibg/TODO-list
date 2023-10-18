import { getToDo } from "./component/todo.js";

export function getElement(tagName, className) {
  const element = document.createElement(tagName);
  element.classList.add(className);
  return element;
}

export function getInput(placeholder, className) {
  const input = getElement("input", className);
  input.setAttribute("type", "text");
  input.setAttribute("placeholder", placeholder);
  return input;
}

export function getLabel(text) {
  const label = getElement("label", "label");
  label.innerText = text;
  return label;
}

export function getButton(buttonTextContent) {
  const button = getElement("a", "button");
  button.textContent = buttonTextContent;
  button.setAttribute("type", "submit");
  button.setAttribute("href", "#");
  return button;
}

export function refreshInitialState() {
  let completedCount = 0;
  getTodoList().forEach((todoItem) => {
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

export function getRefactorDate() {
  let date = new Date();
  return (
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
    ("00" + date.getSeconds()).slice(-2)
  );
}

export function updateToDoCount(event) {
  event.target.parentElement.parentElement.children[1].children.item(
    0,
  ).firstChild.textContent = `All: ${event.target.parentElement.parentElement.children[2].children.length}`;
}

export function updateCompletedToDoCount(event) {
  event.target.parentElement.parentElement.children[1].children.item(
    1,
  ).firstChild.textContent = `Completed: ${
    event.target.parentElement.parentElement.children[2].getElementsByClassName(
      "completed",
    ).length
  }`;
}

export function getTodoList() {
  return localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];
}

export const todoContainer = getElement("div", "todo-container");

export function addData(todo, event) {
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
