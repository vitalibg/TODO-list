export function getElement(tagName, className) {
  const element = document.createElement(tagName);
  element.classList.add(className);
  return element;
}

export function getButton(buttonTextContent) {
  const button = getElement("a", "button");
  button.textContent = buttonTextContent;
  button.setAttribute("type", "submit");
  button.setAttribute("href", "#");
  return button;
}

export function getLabel(text) {
  const label = getElement("label", "label");
  label.innerText = text;
  return label;
}

export function getInput(placeholder, className) {
  const input = getElement("input", className);
  input.setAttribute("type", "text");
  input.setAttribute("placeholder", placeholder);
  return input;
}

export function getTodoList() {
  return localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];
}

export function getRefactorDate() {
  let date = new Date();
  return (
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
    ("00" + date.getSeconds()).slice(-2)
  );
}
