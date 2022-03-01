"use strict";
import * as sound from "./sound.js";
const carrotSize = 80;

//this라는 것은 클래스 안에 있는 함수를 다른 이벤트의 콜백으로 전달할때,
//그 함수가 포함되어져 있는 클래스의 정보가 사라진다(클래스 자체만 전달)
//클래스(this=>클래스를 가르키는 것)와 함수를 묶을 수 있는 바인딩이란 것이 있는데,
// => 함수야~ 함수는 이 클래스와 바인딩해 라고 작성 or
// arrow function으로 event를 전달 해줄 수도 있다.

export const ItemType = Object.freeze({
	carrot: "carrot",
	bug: "bug",
});
export class Field {
	constructor(carrotCount, bugCount) {
		console.log(this);
		this.carrotCount = carrotCount;
		this.bugCount = bugCount;
		this.field = document.querySelector(".game_field");
		this.fieldRect = this.field.getBoundingClientRect();
		//첫번째 가르키고 있는 this와 bind(합쳐라)
		//this.onClick = this.onClick.bind(this);
		//두번째 화살표 함수로 이벤트 인자 전달 하여 this 알려주기
		//this.field.addEventListener("click", (event) => this.onClick(TextEvent));
		//멤버변수에 넣어서
		this.field.addEventListener("click", this.onClick);
	}
	init() {
		this.field.innerHTML = "";
		this._addItem("carrot", this.carrotCount, "img/carrot.png");
		this._addItem("bug", this.bugCount, "img/bug.png");
	}
	setClickListener(onItemClick) {
		this.onItemClick = onItemClick;
	}
	//_ = > private
	_addItem(className, count, imgPath) {
		const x1 = 0;
		const y1 = 0;
		const x2 = this.fieldRect.width - carrotSize;
		const y2 = this.fieldRect.height - carrotSize;
		for (let i = 0; i < count; i++) {
			const item = document.createElement("img");
			item.className = className;
			item.setAttribute("src", imgPath);
			item.style.position = "absolute";
			const x = randomNumber(x1, x2);
			const y = randomNumber(y1, y2);
			item.style.left = `${x}px`;
			item.style.top = `${y}px`;
			this.field.appendChild(item);
		}
	}
	//멤버 변수에 함수 할당
	onClick = (event) => {
		const target = event.target;
		if (target.classList.contains(ItemType.carrot)) {
			target.remove();
			sound.playCarrot();
			this.onItemClick && this.onItemClick(ItemType.carrot);
		} else if (target.classList.contains(ItemType.bug)) {
			this.onItemClick && this.onItemClick(ItemType.bug);
		}
	};
}

function randomNumber(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}
