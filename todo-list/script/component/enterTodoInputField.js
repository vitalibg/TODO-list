import { getInput } from "../utils.js";

export function getEnterToDoInputField() {
  const enterToDoInput = getInput("Enter todo ...", "input");
  enterToDoInput.classList.add("enter-todo");
  return enterToDoInput;
}
