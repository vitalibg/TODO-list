import { getAddButton } from "./addButton.js";
import { getDeleteAllButton } from "./deleteButton.js";
import { getDeleteLastButton } from "./deleteLastButton.js";
import { getEnterToDoInputField } from "./enterTodoInputField.js";
import { getAllLabel, getCompletedLabel } from "./label.js";
import { getSearchInputField } from "./searchInputField.js";
import { getShowAllButton } from "./showAllButton.js";
import { getShowCompletedButton } from "./showCompletedButton.js";

export const component = {
  addButton: getAddButton,
  deleteButton: getDeleteAllButton,
  deleteLastButton: getDeleteLastButton,
  enterToDoInputField: getEnterToDoInputField,
  allLabel: getAllLabel,
  completedLabel: getCompletedLabel,
  searchInputField: getSearchInputField,
  showAllButton: getShowAllButton,
  showCompletedButton: getShowCompletedButton,
};
