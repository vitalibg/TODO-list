import { getElement, getRefactorDate } from "../utils.js";
import { handler } from "../handler/handler.js";

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
  todoDateContainer.textContent = todoData || getRefactorDate();
  todoCloseWrap.append(todoDateContainer);
  todo.append(todoCloseWrap);
  todo.addEventListener("click", (event) => handler.closeTodo(event));
  todo.addEventListener("click", (event) => handler.completeTodo(event));
  return todo;
}
