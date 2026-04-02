const startBtn = document.querySelector(".start");
const pauseBtn = document.querySelector(".pause");
const stopBtn = document.querySelector(".stop");
const resetBtn = document.querySelector(".reset");
const stopwatch = document.querySelector(".stopwatch");
const time = document.querySelector(".time");
const timeList = document.querySelector(".time-list");
const infoBtn = document.querySelector(".info-question");
const modalShadow = document.querySelector(".modal-shadow");
const closeModalBtn = document.querySelector(".close");
const historyBtn = document.querySelector(".history");
const colorBrushBtn = document.querySelector(".info-brush");
const colorSelectorBox = document.querySelector(".color-selector");
const colorOne = document.querySelector(".color-ring.one");
const colorTwo = document.querySelector(".color-ring.two");
const colorThree = document.querySelector(".color-ring.three");
const colorInput = document.querySelector("#color");
const colorGear = document.querySelector(".fa-gear");
const root = document.querySelector(":root");
let timerId = null;
let timesArr = [];
let totalSeconds = 0;
colorInput.value = "#C11720";

const formatTime = () => {
	const minutes = Math.floor(totalSeconds / 60);
	const seconds = totalSeconds % 60;
	stopwatch.textContent = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};
const timerStart = () => {
	if (timerId) return;
	timerId = setInterval(() => {
		totalSeconds++;
		formatTime();
	}, 1000);
};
const timerPause = () => {
	clearInterval(timerId);
	timerId = null;
};
const timerStop = () => {
	if (stopwatch.textContent !== "00:00") {
		time.classList.add("time-show");
		time.textContent = `Ostatni czas: ${stopwatch.textContent}`;
		timesArr.push(stopwatch.textContent);
	}
	timerPause();
	totalSeconds = 0;
	timeList.textContent = "";
	formatTime();
};
const timerReset = () => {
	timerPause();
	totalSeconds = 0;
	formatTime();
	timeList.textContent = "";
	time.classList.remove("time-show");
	timesArr = [];
};
const showHistory = () => {
	let num = 1;
	timeList.textContent = "";
	timesArr.forEach((time) => {
		const newTime = document.createElement("li");
		newTime.innerHTML = `Pomiar nr. ${num}: <span>${time}</span>`;
		timeList.append(newTime);
		num++;
	});
};
const modalHandle = () => {
	modalShadow.classList.toggle("hide-modal");
	modalShadow.classList.toggle("modal-animation");
};
const colorChangeHandle = () => {
	colorSelectorBox.classList.toggle("color-selector-animation");
};
const colorRingHandle = (color) => {
	root.style.setProperty("--first-color", color);
};
startBtn.addEventListener("click", timerStart);
pauseBtn.addEventListener("click", timerPause);
stopBtn.addEventListener("click", timerStop);
resetBtn.addEventListener("click", timerReset);
historyBtn.addEventListener("click", showHistory);
infoBtn.addEventListener("click", modalHandle);
closeModalBtn.addEventListener("click", modalHandle);
colorBrushBtn.addEventListener("click", colorChangeHandle);
colorOne.addEventListener("click", () => colorRingHandle("#c11720"));
colorTwo.addEventListener("click", () => colorRingHandle("#22a40b"));
colorThree.addEventListener("click", () => colorRingHandle("#a30db1"));
colorInput.addEventListener("input", () => colorRingHandle(colorInput.value));
window.addEventListener("click", (e) => {
	e.target === modalShadow ? modalHandle() : false;
});
