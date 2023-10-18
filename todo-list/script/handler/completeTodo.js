export function completeTodoHandler(event) {
    if (event.target.className === "checkmark") {
        event.target.parentElement.parentElement.parentElement.classList.toggle(
            "completed",
        );
        event.target.parentElement.parentElement.parentElement.children[1].classList.toggle(
            "cross-text",
        );
        event.target.parentElement.parentElement.parentElement.parentElement.parentElement.children[1].children.item(
            1,
        ).firstChild.textContent = `Completed: ${
            event.target.parentElement.parentElement.parentElement.parentElement.getElementsByClassName(
                "completed",
            ).length
        }`;

        const completedTodos = [];
        const todoList =
            event.target.parentElement.parentElement.parentElement.parentElement
                .children;
        const todosList = JSON.parse(localStorage.getItem("todos"));

        for (let i = 0; i < todoList.length; i++) {
            if (todoList[i].className.includes("todo-wrap completed")) {
                completedTodos.push(i);
            }
        }

        for (let i = 0; i < todosList.length; i++) {
            todosList[i].todoIsChecked = false;
        }

        for (let i = 0; i < todosList.length; i++) {
            for (let j = 0; j < completedTodos.length; j++) {
                if (i === completedTodos[j]) {
                    todosList[i].todoIsChecked = true;
                }
            }
        }

        localStorage.clear();
        localStorage.setItem("todos", JSON.stringify(todosList));
    }
}
