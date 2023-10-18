import { getElement, getLabel } from "../utils.js";

export function getAllLabel() {
  const allLabel = getElement("div", "all-label");
  allLabel.append(getLabel(`All: ${todos.length}`));
  return allLabel;
}

export function getCompletedLabel() {
  const completedLabel = getElement("div", "completed-label");
  completedLabel.append(getLabel("Completed: 0"));
  return completedLabel;
}
