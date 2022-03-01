"use strict";

const putBtn = document.getElementById("putBtn"),
	text = document.getElementById("ToDo"),
	list = document.getElementById("list"),
	doneList = document.getElementById("doneList"),
	form = document.getElementById("form"),
	delAll = document.getElementById("removeAll"),
	delChecked = document.getElementById("removeChecked"),
	checkAll = document.getElementById("checkAll"),
	dim = document.querySelector(".dim"),
	checkRemoveAll = document.querySelector(".checkRemove"),
	btnWrap = document.getElementById("buttonWrap");

let listLength, cTarget, checked;

// todolist localstorage
let todoData = JSON.parse(localStorage.getItem("todo"));
let itemsArray = todoData ? todoData : [];
localStorage.setItem("todo", JSON.stringify(itemsArray));
if (todoData == null) todoData = [];

todoData.forEach(function (text, listLength) {
	createTagsTodo("todoList", "c", text, list, listLength + 1);
});

// donelist localstorage
let doneData = JSON.parse(localStorage.getItem("done"));
let doneArray = doneData ? doneData : [];
localStorage.setItem("done", JSON.stringify(doneArray));
if (doneData == null) doneData = [];

doneData.forEach(function (text, listLength) {
	createTagsTodo("doneList on", "cD", text, doneList, listLength + 1);
});

// add todolist
form.addEventListener("submit", addList);

function addList(e) {
	e.preventDefault();

	if (!text.value || text.value.trim() == "") {
		alert("할일을 적어주세요!");
		text.focus();
		text.value = "";
		return false;
	}
	itemsArray.push(text.value);
	listLength = list.children.length + 1;

	setItems();
	createTagsTodo("todoList", "c", text.value, list, listLength + 1);
	text.value = "";
}

//checkbox test
function checkOne(allList) {
	allList.forEach(function (ele) {
		ele.firstChild.addEventListener("click", function () {
			checked = document.querySelectorAll(".checkMark:checked").length;
			const sumList = list.children.length + doneList.children.length;

			if (!this.checked) testCheck(false);
			if (checked == sumList) testCheck(true);
		});
	});
	if (checked !== list.children.length) testCheck(false);
}

//list 삭제하기
function removeCurrentList(removeBtn) {
	removeBtn.addEventListener("click", function (e) {
		cTarget = e.currentTarget.parentElement;
		cTarget.remove();

		const sumLength = list.children.length + doneList.children.length;
		checked = document.querySelectorAll(".checkMark:checked");

		if (sumLength == 0) testCheck(false);
		else if (checked.length == sumLength) testCheck(true);

		targetRemoveStorage1(cTarget);
		idReset();
	});
}

//donelist 보내기
function toggleCheck(doneBox) {
	doneBox.addEventListener("click", function (e) {
		cTarget = e.currentTarget.parentElement;
		cTarget.classList.toggle("on");

		if (cTarget.classList[1] == "on") {
			sendToDone("doneList on", doneList);
		} else {
			sendToDone("todoList", list);
		}

		function sendToDone(cName, listname) {
			cTarget.className = cName;
			listname.append(cTarget);
		}
		targetRemoveStorage2();
		idReset();
	});
}

//etc function
function testCheck(set) {
	checkAll.checked = set;
}

// localstorage 배열 저장 삭제
function setItems() {
	localStorage.setItem("todo", JSON.stringify(itemsArray));
}
function setDone() {
	localStorage.setItem("done", JSON.stringify(doneArray));
}

function resetStorage(array, ele) {
	for (let i = 0; i < ele.length; i++) {
		let aa = ele[i].innerText;
		array.push(aa);
	}
}

function targetRemoveStorage1(cTarget) {
	let allTodo = document.querySelectorAll("#list li");
	let allDone = document.querySelectorAll("#doneList li");

	if (cTarget.className.substr(0, 1) == "t") {
		itemsArray = [];
		resetStorage(itemsArray, allTodo);
		setItems();
	}
	if (cTarget.className.substr(0, 1) == "d") {
		doneArray = [];
		resetStorage(doneArray, allDone);
		setDone();
	}
}
function targetRemoveStorage2() {
	let allTodo2 = document.querySelectorAll("#list li");
	let allDone2 = document.querySelectorAll("#doneList li");

	doneArray = [];
	resetStorage(doneArray, allDone2);
	setDone();
	itemsArray = [];
	resetStorage(itemsArray, allTodo2);
	setItems();
}

//idReset
function idReset() {
	const alltodoList = document.querySelectorAll("#list li"),
		alltodoListLength = alltodoList.length,
		allCheckBtn = document.querySelectorAll("#list li .checkMark"),
		allLabel = document.querySelectorAll("#list li .label");

	for (let i = 0; i < alltodoListLength; i++) {
		allCheckBtn[i].id = "c" + (i + 1);
		allLabel[i].setAttribute("for", "c" + (i + 1));
	}

	const alldoneList = document.querySelectorAll("#doneList li"),
		alldoneListLength = alldoneList.length,
		allCheckBtn2 = document.querySelectorAll("#doneList li .checkMark"),
		allLabel2 = document.querySelectorAll("#doneList li .label");
	for (let i2 = 0; i2 < alldoneListLength; i2++) {
		allCheckBtn2[i2].id = "cD" + (i2 + 1);
		allLabel2[i2].setAttribute("for", "cD" + (i2 + 1));
	}
}
