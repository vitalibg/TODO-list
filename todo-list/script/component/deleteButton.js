import { handler } from "../handler/handler.js";
import { getButton } from "../utils.js";

export function getDeleteAllButton() {
  const deleteAllButton = getButton("Delete All");
  deleteAllButton.addEventListener("click", (event) =>
    handler.deleteAll(event),
  );
  return deleteAllButton;
}
