const username = document.querySelector("#username");
const pass = document.querySelector("#password");
const pass2 = document.querySelector("#password2");
const email = document.querySelector("#email");
const sendBtn = document.querySelector(".send");
const clearBtn = document.querySelector(".clear");
const popup = document.querySelector(".popup");
const inputArray = [username, pass, pass2, email];

const showError = (input, msg) => {
	const formBox = input.closest(".form-box");
	const errorMsg = formBox.querySelector(".error-text");
	formBox.classList.add("error");
	errorMsg.textContent = msg;
};
const clearError = (input) => {
	const formBox = input.closest(".form-box");
	formBox.classList.remove("error");
};

const checkForm = (input) => {
	input.forEach((el) => {
		if (el.value === "") {
			showError(el, el.placeholder);
		} else {
			clearError(el);
		}
	});
};

const checkLength = (input, min) => {
	const labelText = input.previousElementSibling.innerText;
	if (input.value.length < min) {
		showError(
			input,
			`${labelText.slice(0, -1)} składa się z min. ${min} znaków.`,
		);
	}
};
const checkPasswd = (pass1, pass2) => {
	if (pass1.value !== pass2.value) {
		showError(pass2, "Hasła nie są takie same.");
	}
};
const checkMail = (email) => {
	const re =
		/^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_'+\-]@([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,}$/i;

	if (re.test(email.value)) {
		clearError(email);
	} else {
		showError(email, "E-mail jest niepoprawny");
	}
};

const checkErrors = () => {
	const allFormBoxes = document.querySelectorAll(".form-box");
	let errorCount = 0;
	allFormBoxes.forEach((el) => {
		if (el.matches(".error")) {
			errorCount++;
		}
	});
	if (errorCount === 0) {
		popup.classList.add("show-popup");
	}
};

const clearBtnHandle = (e) => {
	e.preventDefault();
	// e.preventDefault() zapobiaga aby strona nie przeładowuywała sioe za kazdym kliknieciem w przycisk. Bo przycisk w formie ma defaultowa wartość submit i za kazdym kliknieciem strona probuje wyslac formularz
	inputArray.forEach((el) => {
		el.value = "";
		clearError(el);
	});
};
const sendBtnHandle = (e) => {
	e.preventDefault();
	checkForm(inputArray);
	checkLength(username, 3);
	checkLength(pass, 8);
	checkPasswd(pass, pass2);
	checkMail(email);
	checkErrors();
};
clearBtn.addEventListener("click", clearBtnHandle);
sendBtn.addEventListener("click", sendBtnHandle);
