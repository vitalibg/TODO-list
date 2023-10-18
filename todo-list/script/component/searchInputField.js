import { getInput } from "../utils.js";
import { handler } from "../handler/handler.js";

export function getSearchInputField() {
  const searchInput = getInput("Search ...", "input");
  searchInput.classList.add("search-todo");
  searchInput.addEventListener("keypress", (event) =>
    handler.searchToDo(event),
  );
  return searchInput;
}
