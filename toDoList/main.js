let todoInput,
	errorInfo,
	addBtn,
	ulList,
	newTodo,
	popup,
	popupInfo,
	todoToEdit,
	popupInput,
	popupAddBtn,
	popupCloseBtn;

const main = () => {
	prepareDOMElements();
	prepareDOMEvents();
};

const prepareDOMElements = () => {
	todoInput = document.querySelector(".todo-input");
	errorInfo = document.querySelector(".error-info");
	addBtn = document.querySelector(".btn-add");
	ulList = document.querySelector(".todolist ul");
	popup = document.querySelector(".popup");
	popupInfo = document.querySelector(".popup-info");
	popupInput = document.querySelector(".popup-input");
	popupAddBtn = document.querySelector(".accept");
	popupCloseBtn = document.querySelector(".cancel");
};

const prepareDOMEvents = () => {
	addBtn.addEventListener("click", addNewTodo);
	ulList.addEventListener("click", checkToolsAreaClick);
	popupCloseBtn.addEventListener("click", closePopup);
	popupAddBtn.addEventListener("click", changeTodoText);
	todoInput.addEventListener("keyup", enterKeycheck);
};

const addNewTodo = () => {
	if (todoInput.value !== "") {
		newTodo = document.createElement("li");
		newTodo.textContent = todoInput.value;
		createToolsArea();
		ulList.append(newTodo);
		todoInput.value = "";
		errorInfo.textContent = "";
	} else {
		errorInfo.textContent = "Wpisz treść zadania!";
	}
};
const createToolsArea = () => {
	const todoToolsBox = document.createElement("div");
	todoToolsBox.classList.add("tools");
	newTodo.append(todoToolsBox);
	const todoToolComplete = document.createElement("button");
	todoToolComplete.classList.add("complete");
	todoToolComplete.innerHTML = '<i class="fas fa-check"></i>';
	const todoToolEdit = document.createElement("button");
	todoToolEdit.classList.add("edit");
	todoToolEdit.innerText = "EDIT";
	const todoToolDelete = document.createElement("button");
	todoToolDelete.classList.add("delete");
	todoToolDelete.innerHTML = '<i class="fas fa-times"></i>';
	todoToolsBox.append(todoToolComplete, todoToolEdit, todoToolDelete);
};
const checkToolsAreaClick = (e) => {
	if (e.target.matches(".complete")) {
		e.target.closest("li").classList.toggle("completed");
		e.target.classList.toggle("completed");
	} else if (e.target.matches(".edit")) {
		editToDo(e);
	} else if (e.target.matches(".delete")) {
		deleteTodo(e);
	}
};
const editToDo = (e) => {
	popup.style.display = "flex";
	todoToEdit = e.target.closest("li");
	popupInput.value = todoToEdit.firstChild.textContent;
};
const closePopup = () => {
	popup.style.display = "none";
	popupInfo.textContent = "";
};
const changeTodoText = () => {
	if (popupInput.value !== "") {
		todoToEdit.firstChild.textContent = popupInput.value;
		popup.style.display = "none";
		popupInfo.textContent = "";
	} else {
		popupInfo.textContent = "Musisz podać jakąś treść!";
	}
};
const deleteTodo = (e) => {
	e.target.closest("li").remove();
	const allTodos = ulList.querySelectorAll("li");
	if (allTodos.length === 0) {
		errorInfo.textContent = "Brak zadań na liście.";
	}
};

const enterKeycheck = (e) => {
	if (e.key === "Enter") {
		addNewTodo();
	}
};
document.addEventListener("DOMContentLoaded", main);
