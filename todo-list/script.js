const rootId = document.getElementById("root");
const container = getElement("div", "container");
const wrap = getElement("div", "wrap");

rootId.append(container);
container.append(wrap);

const controlPanel = getElement("div", "panel");
controlPanel.classList.add("control-panel");
const deleteAllButton = getButton("Delete All");
deleteAllButton.addEventListener("click", (event) => {
  if (event.target.textContent === "Delete All") {
    const todo = event.target.parentElement.parentElement.children[2];
    while (todo.firstChild) {
      todo.removeChild(todo.firstChild);
    }
  }
  updateAllState(event);
});
controlPanel.append(deleteAllButton);
const deleteLast = getButton("Delete Last");
deleteLast.addEventListener("click", (event) => {
  if (event.target.textContent === "Delete Last") {
    const todo = event.target.parentElement.parentElement.children[2];
    todo.removeChild(todo.lastChild);
  }
  updateAllState(event);
});
controlPanel.append(deleteLast);
const enterToDoInput = getInput("Enter todo ...", "input");
enterToDoInput.classList.add("enter-todo");
controlPanel.append(enterToDoInput);
const addButton = getButton("Add");
addButton.addEventListener("click", (event) => {
  todoContainer.append(getToDo(enterToDoInput.value));
  enterToDoInput.value = "";
  updateAllState(event);
});
controlPanel.append(addButton);

const infoPanel = getElement("div", "panel");
infoPanel.classList.add("info-panel");
const allLabel = getElement("div", "all-label");
allLabel.append(getLabel("All: 0"));
infoPanel.append(allLabel);
const completedLabel = getElement("div", "completed-label");
completedLabel.append(getLabel("Completed: 0"));
infoPanel.append(completedLabel);
const showAllButton = getButton("Show All");
showAllButton.addEventListener("click", (event) => {
  const allList = event.target.parentElement.parentElement.children[2].children;
  for (const todo of allList) {
    if (
      todo.className.includes("todo-wrap") ||
      todo.className.includes("todo-wrap completed")
    ) {
      todo.classList.remove("active");
    }
  }
});
infoPanel.append(showAllButton);
const showCompletedButton = getButton("Show Completed");
showCompletedButton.addEventListener("click", (event) => {
  const completedList =
    event.target.parentElement.parentElement.children[2].children;
  for (const todo of completedList) {
    if (
      todo.className !== "todo-wrap completed" &&
      todo.className !== "todo-wrap active"
    ) {
      todo.classList.add("active");
    }
  }
});
infoPanel.append(showCompletedButton);
const searchInput = getInput("Search ...", "input");
searchInput.classList.add("search-todo");
searchInput.addEventListener("keypress", (event) => {
  const searchValue = event.target.value.toString();
  if (event.keyCode === 13 || event.key === "Enter") {
    const targetToDo =
      event.target.parentElement.parentElement.children[2].getElementsByClassName(
        "todo-center__input",
      );
    for (const todo of targetToDo) {
      if (todo.textContent === searchValue) {
        todo.parentElement.parentElement.classList.toggle("search");
        setTimeout(() => {
          todo.parentElement.parentElement.classList.toggle("search");
        }, 1000);
      }
    }
    event.target.value = "";
  }
});
infoPanel.append(searchInput);

wrap.append(controlPanel);
wrap.append(infoPanel);

const todoContainer = getElement("div", "todo-container");

wrap.append(todoContainer);

function getToDo(todoText) {
  const todoItem = getElement("div", "todo-wrap");
  const todoItemLeft = getElement("div", "todo-left");
  const todoCheckboxContainer = getElement(
    "label",
    "todo-left__checkbox-container",
  );
  const todoCheckboxInput = getElement("input", "todo-left__checkbox");
  todoCheckboxInput.setAttribute("type", "checkbox");
  const todoCheckboxSpan = getElement("span", "checkmark");
  todoCheckboxContainer.append(todoCheckboxInput);
  todoCheckboxContainer.append(todoCheckboxSpan);
  todoItemLeft.append(todoCheckboxContainer);
  todoItem.append(todoItemLeft);

  const todoItemCenter = getElement("div", "todo-center");
  const todoInput = getElement("div", "todo-center__input");
  todoInput.textContent = todoText;
  todoItemCenter.append(todoInput);
  todoItem.append(todoItemCenter);

  const todoItemRight = getElement("div", "todo-right");
  const todoClose = getElement("div", "todo-right__close");
  const todoCloseImage = getElement("div", "close");
  todoCloseImage.addEventListener("click", (event) => {
    let allElementValue =
      event.target.parentElement.parentElement.parentElement.parentElement.parentElement.children[1].children.item(
        0,
      ).firstChild;
    allElementValue.textContent = `All: ${
      event.target.parentElement.parentElement.parentElement.parentElement
        .children.length - 1
    }`;

    let completedElementValue =
      event.target.parentElement.parentElement.parentElement.parentElement.parentElement.children[1].children[1].children.item(
        0,
      ).firstChild;
    if (
      event.target.parentElement.parentElement.parentElement.parentElement.getElementsByClassName(
        "completed",
      ).length -
        1 <=
      0
    ) {
      completedElementValue.textContent = "Completed: 0";
    }
    completedElementValue.textContent = `Completed: ${
      event.target.parentElement.parentElement.parentElement.parentElement.getElementsByClassName(
        "completed",
      ).length - 1
    }`;
  });
  todoClose.append(todoCloseImage);
  const todoDate = getElement("div", "todo-right__date");
  todoDate.textContent = getDate();
  todoItemRight.append(todoClose);
  todoItemRight.append(todoDate);
  todoItem.append(todoItemRight);
  todoItem.addEventListener("click", (event) => {
    if (event.target.className === "close") {
      event.target.parentElement.parentElement.parentElement.remove();
    }
  });
  todoItem.addEventListener("click", (event) => {
    if (event.target.className === "checkmark") {
      event.target.parentElement.parentElement.parentElement.classList.toggle(
        "completed",
      );
      event.target.parentElement.parentElement.parentElement.children[1].classList.toggle(
        "cross-text",
      );
      let allElementValue =
        event.target.parentElement.parentElement.parentElement.parentElement.parentElement.children[1].children.item(
          1,
        ).firstChild;
      allElementValue.textContent = `Completed: ${
        event.target.parentElement.parentElement.parentElement.parentElement.getElementsByClassName(
          "completed",
        ).length
      }`;
    }
  });
  return todoItem;
}

function getDate() {
  let date = new Date();
  let dateStr =
    ("00" + (date.getMonth() + 1)).slice(-2) +
    "/" +
    ("00" + date.getDate()).slice(-2) +
    "/" +
    date.getFullYear() +
    " " +
    ("00" + date.getHours()).slice(-2) +
    ":" +
    ("00" + date.getMinutes()).slice(-2) +
    ":" +
    ("00" + date.getSeconds()).slice(-2);
  return dateStr;
}

function getElement(tagName, className) {
  const element = document.createElement(tagName);
  element.classList.add(className);
  return element;
}

function getButton(text) {
  const button = getElement("a", "button");
  button.textContent = text;
  button.setAttribute("type", "submit");
  button.setAttribute("href", "#");
  return button;
}

function getLabel(text) {
  const label = getElement("label", "label");
  label.innerText = text;
  return label;
}

function updateAllState(event) {
  let allElementValue =
    event.target.parentElement.parentElement.children[1].children.item(
      0,
    ).firstChild;
  allElementValue.textContent = `All: ${event.target.parentElement.parentElement.children[2].children.length}`;
}

function getInput(placeholder, className) {
  const input = getElement("input", className);
  input.setAttribute("type", "text");
  input.setAttribute("placeholder", placeholder);
  return input;
}
