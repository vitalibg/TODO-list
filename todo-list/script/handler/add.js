import { getToDo } from "../component/todo.js";
import { component } from "../component/component.js";
import { addData, todoContainer, updateToDoCount } from "../utils.js";

export function addHandler(event) {
  let todo = getToDo(component.enterToDoInputField.value);
  todoContainer.append(todo);
  addData(todo, event);
  component.enterToDoInputField.value = "";
  updateToDoCount(event);
}
