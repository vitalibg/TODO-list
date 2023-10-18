import { handler } from "../handler/handler.js";
import { getButton } from "../utils.js";

export function getShowAllButton() {
  const showAllButton = getButton("Show All");
  showAllButton.addEventListener("click", (event) => handler.showAll(event));
  return showAllButton;
}
