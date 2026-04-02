const answear = document.querySelector(".answear");
const error = document.querySelector(".error");
const input = document.querySelector("input");
const ballImg = document.querySelector("img");
const ballAnswears = [
	"To pewne",
	"Odpowiedź niejasna, spróbuj jeszcze raz ",
	"Nie licz na to",
	"To zdecydowanie tak",
	"Zapytaj później",
	"Moja odpowiedź brzmi: nie",
	"Bez wątpienia",
	"Lepiej ci teraz nie mówić",
	"Moje źródła mówią, że nie",
	"Tak, zdecydowanie",
	"Nie potrafię tego przewidzieć",
	"Perspektywy nie są zbyt dobre",
	"Możesz na to liczyć",
	"Zbierz myśli i zapytaj jeszcze raz",
	"Bardzo wątpliwe",
	"Moim zdaniem tak",
	"Najprawdopodobniej",
	"Perspektywy są dobre",
	"Tak",
	"Wszystko wskazuje na to, że tak",
];

const ballHandle = () => {
	ballImg.classList.add("shake-animation");
	setTimeout(checkInput, 1000);
};
const ballAnimationRemove = () => {
	ballImg.classList.remove("shake-animation");
};

const checkInput = () => {
	const lastChar = input.value.slice(-1);
	if (input.value === "") {
		error.textContent = "Musisz zadać pytanie!";
		answear.textContent = "";
	} else if (lastChar !== "?") {
		error.textContent = 'Pytanie musi kończyć się "?"';
		answear.textContent = "";
	} else {
		showAnswear();
	}
	ballAnimationRemove();
};
const showAnswear = () => {
	const randAnswear = Math.floor(Math.random() * ballAnswears.length);
	answear.innerHTML = `<span>Odpowiedź: </span> ${ballAnswears[randAnswear]}`;
	error.textContent = "";
	input.value = "";
};

ballImg.addEventListener("click", ballHandle);
