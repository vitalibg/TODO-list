import { getButton } from "../utils.js";
import { handler } from "../handler/handler.js";

export function getAddButton() {
  const addButton = getButton("Add");
  addButton.addEventListener("click", (event) => handler.add(event));
  return addButton;
}
