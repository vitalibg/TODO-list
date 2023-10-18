import { getButton } from "../utils.js";
import { handler } from "../handler/handler.js";

export function getDeleteLastButton() {
  const deleteLastButton = getButton("Delete Last");
  deleteLastButton.addEventListener("click", (event) =>
    handler.deleteLast(event),
  );
  return deleteLastButton;
}
