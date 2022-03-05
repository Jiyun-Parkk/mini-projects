const dice = document.querySelectorAll(".dice");
const play = document.querySelector(".play");
const reset = document.querySelector(".reset");
const seedMoney = document.querySelector(".seed-money");
const input = document.querySelector("input");

let minNum = 1;
let middleNum = 5;
let maxNum = 100;
let basicMoneny;
let refNum;
let getMoney;

window.addEventListener("load", function () {
	resetSeed();
	play.addEventListener("click", clickPlaybtn);
	reset.addEventListener("click", resetSeed);
});

function clickPlaybtn() {
	//유효성검사
	const inputValue = input.value;
	const inputValueNum = Number(input.value);

	if (!inputValue || inputValue.trim() === "" || inputValueNum === 0) {
		alert("게임머니를 걸어주세요!");
		inputValue = "";
		input.focus();
		return;
	}

	if (basicMoneny !== 0 && inputValueNum > basicMoneny) {
		alert("게임머니가 씨드머니보다 큽니다!");
		return;
	}

	if (inputValue) playDiceGame(inputValueNum);
	seedMoney.innerHTML = basicMoneny;
}

function playDiceGame(inputValueNum) {
	//참조숫자
	refNum = Math.floor(Math.random() * 100) + 1;

	if (basicMoneny > 0) {
		basicMoneny = basicMoneny - inputValueNum;
		if (minNum <= refNum && refNum <= middleNum) {
			makeSameNumber();
		} else if (middleNum < refNum && refNum <= maxNum) {
			makeRandomNumber();
		}
	} else {
		alert("돈을 다 썼습니다");
	}
}

//무조건 다른 숫자 넣어주기
function makeRandomNumber() {
	let random1 = Math.floor(Math.random() * 6) + 1;
	let random2 = Math.floor(Math.random() * 6) + 1;
	//같은 숫자가 나올 확률 높여주기
	if (middleNum < 100) middleNum += 5;

	if (random1 !== random2) {
		putRandomNumber(random1, random2);
	} else {
		random1 < 6 ? (random1 += 1) : (random1 -= 1);
		putRandomNumber(random1, random2);
	}
}

//무조건 같은 숫자 넣어주기
function makeSameNumber() {
	//확률값 초기화
	middleNum = 5;
	checkRange();
	let currentMoney = basicMoneny;
	basicMoneny = currentMoney + getMoney;
}

function putRandomNumber(num1, num2) {
	dice[0].innerHTML = num1;
	dice[1].innerHTML = num2;
	if (num1 === num2) getMoney = Number(input.value) * num1;
}

function checkRange() {
	switch (true) {
		case 1 < refNum && refNum <= 25:
			putRandomNumber(1, 1);
			break;
		case 25 < refNum && refNum <= 40:
			putRandomNumber(2, 2);
			break;
		case 40 < refNum && refNum <= 65:
			putRandomNumber(3, 3);
			break;
		case 65 < refNum && refNum <= 75:
			putRandomNumber(4, 4);
			break;
		case 75 < refNum && refNum <= 85:
			putRandomNumber(5, 5);
			break;
		case 85 < refNum && refNum <= 100:
			putRandomNumber(6, 6);
			break;
	}
}

function resetSeed() {
	basicMoneny = 1000;
	seedMoney.innerHTML = basicMoneny;
	input.value = 1;
}
