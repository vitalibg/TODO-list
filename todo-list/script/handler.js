import {
  addData,
  getTodoList,
  updateCompletedToDoCount,
  updateToDoCount,
} from "./utils.js";
import { enterToDoInputField, getToDo, todoContainer } from "./element.js";

const TODO_HIGHLIGHT_TIME = 1000;

export function closeTodoHandler(event) {
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
      todosList.findIndex((title) => title.text === titleDeletedTodo),
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

export function completeTodoHandler(event) {
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
      todosList[i].isChecked = false;
    }

    for (let i = 0; i < todosList.length; i++) {
      for (let j = 0; j < completedTodos.length; j++) {
        if (i === completedTodos[j]) {
          todosList[i].isChecked = true;
        }
      }
    }

    localStorage.clear();
    localStorage.setItem("todos", JSON.stringify(todosList));
  }
}

export function deleteAllHandler(event) {
  const todoList = event.target.parentElement.parentElement.children[2];
  while (todoList.firstChild) {
    todoList.removeChild(todoList.firstChild);
  }
  localStorage.clear();
  updateToDoCount(event);
  updateCompletedToDoCount(event);
}

export function deleteLastHandler(event) {
  const todoList = event.target.parentElement.parentElement.children[2];
  todoList.removeChild(todoList.lastChild);
  let todosList = getTodoList();
  todosList.pop();
  localStorage.clear();
  localStorage.setItem("todos", JSON.stringify(todosList));
  updateToDoCount(event);
  updateCompletedToDoCount(event);
}

export function addHandler(event) {
  let todo = getToDo(enterToDoInputField.value);
  todoContainer.append(todo);
  addData(todo, event);
  enterToDoInputField.value = "";
  updateToDoCount(event);
}

export function showAllHandler(event) {
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

export function showCompletedHandler(event) {
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

export function searchToDoHandler(event) {
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
