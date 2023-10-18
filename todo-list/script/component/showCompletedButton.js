import { getButton } from "../utils.js";
import { handler } from "../handler/handler.js";

export function getShowCompletedButton() {
  const showCompletedButton = getButton("Show Completed");
  showCompletedButton.addEventListener("click", (event) =>
    handler.showCompleted(event),
  );
  return showCompletedButton;
}
