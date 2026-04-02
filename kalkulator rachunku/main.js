const price = document.querySelector("#price");
const people = document.querySelector("#people");
const tip = document.querySelector("#tip");
const btn = document.querySelector(".count");
const costSpan = document.querySelector(".cost");
const errorInfo = document.querySelector(".error");
const costInfo = document.querySelector(".cost-info");
const checkForm = () => {
	if (price.value === "" || people.value === "" || tip.value === 0) {
		errorInfo.style.display = "block";
		errorInfo.textContent = "Wypełnij wszystkie pola formularza";
		costInfo.style.display = "none";
	} else {
		billCount();
	}
};
// tu można by zrobić osobne zmienne dla kazdego value i dodać parsefloat albo int bo price.value zwraca typ strin i jakby w dzialaniu bylo dodawanie to by nie dzialalo popraweni tylko robilo konkatenacje
const billCount = () => {
	const result = (price.value * tip.value) / people.value;
	costSpan.innerText = result.toFixed(2);
	costInfo.style.display = "block";
	errorInfo.textContent = "";
	price.value = "";
	people.value = "";
	tip.value = 0;
};
btn.addEventListener("click", checkForm);
