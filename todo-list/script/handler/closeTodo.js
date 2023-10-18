export function closeTodoHandler(event) {
  const todosList = JSON.parse(localStorage.getItem("todos"));
  let completedCount = 0;
  if (event.target.className === "todo-close") {
    const titleDeletedTodo =
      event.target.parentElement.parentElement.parentElement.children[1]
        .firstChild.textContent;
    document.querySelector(".all-label .label").textContent = `All: ${
      event.target.parentElement.parentElement.parentElement.parentElement
        .children.length - 1
    }`;
    todosList.splice(
      todosList.findIndex((title) => title.todoText === titleDeletedTodo),
      1,
    );
    event.target.parentElement.parentElement.parentElement.remove();
    const completedTodoCount = document.getElementsByClassName("todo-wrap");
    for (let i = 0; i < completedTodoCount.length; i++) {
      if (completedTodoCount[i].className.includes("todo-wrap completed")) {
        completedCount++;
      }
    }
    document.querySelector(
      ".completed-label .label",
    ).textContent = `Completed: ${completedCount}`;
  }
  localStorage.clear();
  localStorage.setItem("todos", JSON.stringify(todosList));
}
