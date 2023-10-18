import {
  getTodoList,
  updateCompletedToDoCount,
  updateToDoCount,
} from "../utils.js";

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
