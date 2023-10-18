import { updateCompletedToDoCount, updateToDoCount } from "../utils.js";

export function deleteAllHandler(event) {
  const todoList = event.target.parentElement.parentElement.children[2];
  while (todoList.firstChild) {
    todoList.removeChild(todoList.firstChild);
  }
  localStorage.clear();
  updateToDoCount(event);
  updateCompletedToDoCount(event);
}
