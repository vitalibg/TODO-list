import { getToDo, todoContainer } from "./element.js";

export function getTodoList() {
  return localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];
}

export function getDate() {
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

export function addData(todo, event) {
  const lastChild =
    event.target.parentElement.parentElement.children[2].lastChild;
  const id = todo.id;
  const data = lastChild.childNodes[2].childNodes[1].textContent;
  const text = lastChild.childNodes[1].firstChild.textContent;
  const isChecked = false;
  const todos = getTodoList();
  todos.push({ id, data, text, isChecked });
  localStorage.setItem("todos", JSON.stringify(todos));
}

export function refreshInitialState() {
  let completedCount = 0;
  getTodoList().forEach((todo) => {
    todoContainer.append(getToDo(todo.text, todo.data, todo.id));
    if (todo.isChecked) {
      completedCount++;
      todoContainer.lastChild.classList.toggle("completed");
      todoContainer.lastElementChild.children[1].classList.toggle("cross-text");
      // TODO: Add realization of pressed checkbox when page is updated
      // todoContainer.lastElementChild.firstElementChild.firstElementChild.lastElementChild.classList.toggle("checked")
    }
    document.querySelector(
      ".completed-label .label",
    ).textContent = `Completed: ${completedCount}`;
  });
}
