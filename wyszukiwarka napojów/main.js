const input = document.querySelector(".header__input");
const liItems = document.querySelectorAll(".drink-list__list li");
console.log(input);
console.log(liItems);

const drinkCheck = () => {
	console.log(input.value);

	for (let i = 0; i < liItems.length; i++) {
		if (
			liItems[i].textContent
				.toLowerCase()
				.indexOf(input.value.toLowerCase()) === -1
		) {
			liItems[i].classList.remove("show");
			liItems[i].classList.add("hide");
		} else {
			liItems[i].classList.add("show");
			liItems[i].classList.remove("hide");
		}
	}
};
// Alternatywą może być wykorzystanie e.target.value zamiast input .value, oraz zamiast index of mozna wykorzystać new Regexp
input.addEventListener("keyup", drinkCheck);
