let todoInput,
	errorInfo,
	addBtn,
	ulList,
	popup,
	popupInfo,
	todoToEdit,
	popupInput,
	popupAddBtn,
	popupCloseBtn,
	popupShadow,
	filterBtns,
	todos = [],
	currentFilter = "all";

const main = () => {
	prepareDOMElements();
	prepareDOMEvents();
	loadTodosFromLocalStorage();
	renderTodos();
};
const prepareDOMElements = () => {
	todoInput = document.querySelector(".todo-app__header-input");
	errorInfo = document.querySelector(".todo-app__list-error-info");
	addBtn = document.querySelector(".todo-app__header-btn");
	ulList = document.querySelector(".todo-app__list-list");
	popup = document.querySelector(".popup");
	popupInfo = document.querySelector(".popup__body-info");
	popupInput = document.querySelector(".popup__body-input");
	popupAddBtn = document.querySelector(".popup__body-btn--accept");
	popupCloseBtn = document.querySelector(".popup__body-btn--cancel");
	filterBtns = document.querySelectorAll(".todo-app__filters-btn");
	popupShadow = document.querySelector(".popup-shadow");
};
const prepareDOMEvents = () => {
	addBtn.addEventListener("click", addNewTodo);
	ulList.addEventListener("click", handleTodoListClick);
	popupCloseBtn.addEventListener("click", closePopup);
	popupAddBtn.addEventListener("click", changeTodoText);
	todoInput.addEventListener("keydown", enterKeycheck);
	filterBtns.forEach((btn) => {
		btn.addEventListener("click", changeFilter);
	});
};
const getFilteredTodos = () => {
	if (currentFilter === "active") {
		return todos.filter((todo) => !todo.completed);
	}
	if (currentFilter === "completed") {
		return todos.filter((todo) => todo.completed);
	}
	return todos;
};
const renderTodos = () => {
	ulList.textContent = "";

	const filteredTodos = getFilteredTodos();

	if (filteredTodos.length === 0) {
		errorInfo.textContent = "Brak zadań na liście";
		return;
	}
	errorInfo.textContent = "";

	filteredTodos.forEach((todo) => {
		const li = document.createElement("li");
		li.dataset.id = todo.id;

		li.innerHTML = `<span class="${todo.completed ? "completed" : ""}">${todo.text}</span>
			<div class="tools">
				<button class="complete"><i class="fas fa-check"></i></button>
				<button class="edit">EDIT</button>
				<button class="delete"><i class="fas fa-times"></i></button>
			</div>`;
		ulList.append(li);
	});
};
const saveTodosToLocalStorage = () => {
	localStorage.setItem("todos", JSON.stringify(todos));
};

const loadTodosFromLocalStorage = () => {
	const storedTodos = localStorage.getItem("todos");
	todos = storedTodos ? JSON.parse(storedTodos) : [];
};
const addNewTodo = () => {
	const text = todoInput.value.trim();
	if (text === "") {
		errorInfo.textContent = "Wpisz treść zadania!";
		return;
	}
	const newTodo = {
		id: Date.now(),
		text,
		completed: false,
	};
	todos.push(newTodo);

	saveTodosToLocalStorage();
	renderTodos();
	todoInput.value = "";
};
const handleTodoListClick = (e) => {
	const todoId = Number(e.target.closest("li").dataset.id);

	if (e.target.matches(".complete")) {
		toggleTodoComplete(todoId);
	} else if (e.target.matches(".edit")) {
		openEditPopup(todoId);
	} else if (e.target.matches(".delete")) {
		deleteTodo(todoId);
	}
};
const toggleTodoComplete = (id) => {
	const todo = todos.find((todo) => todo.id === id);
	todo.completed = !todo.completed;
	saveTodosToLocalStorage();
	renderTodos();
};
const openEditPopup = (id) => {
	popupShadow.classList.add("active");
	popup.style.display = "flex";
	todoToEdit = id;
	const todo = todos.find((todo) => todo.id === id);
	popupInput.value = todo.text;
};
const closePopup = () => {
	popupShadow.classList.remove("active");
	popup.style.display = "none";
	popupInfo.textContent = "";
};
const changeTodoText = () => {
	const text = popupInput.value.trim();
	if (text === "") {
		popupInfo.textContent = "Musisz podać jakąś treść!";
		return;
	}
	const todo = todos.find((todo) => todo.id === todoToEdit);
	todo.text = text;
	saveTodosToLocalStorage();
	renderTodos();
	closePopup();
};
const deleteTodo = (id) => {
	todos = todos.filter((todo) => todo.id !== id);
	saveTodosToLocalStorage();
	renderTodos();
};
const changeFilter = (e) => {
	currentFilter = e.target.dataset.filter;
	renderTodos();
};
const enterKeycheck = (e) => {
	if (e.key === "Enter") {
		addNewTodo();
	}
};

main();
