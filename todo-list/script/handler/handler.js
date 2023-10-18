import { addHandler } from "./add.js";
import { closeTodoHandler } from "./closeTodo.js";
import { completeTodoHandler } from "./completeTodo.js";
import { deleteAllHandler } from "./deleteAll.js";
import { deleteLastHandler } from "./deleteLast.js";
import { searchToDoHandler } from "./searchTodo.js";
import { showAllHandler } from "./showAll.js";
import { showCompletedHandler } from "./showCompleted.js";

export const handler = {
  add: addHandler,
  closeTodo: closeTodoHandler,
  completeTodo: completeTodoHandler,
  deleteAll: deleteAllHandler,
  deleteLast: deleteLastHandler,
  searchToDo: searchToDoHandler,
  showAll: showAllHandler,
  showCompleted: showCompletedHandler,
};
