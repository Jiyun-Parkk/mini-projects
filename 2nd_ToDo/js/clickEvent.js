"use strict";

putBtn.addEventListener("click", addList);
delAll.addEventListener("click", deleteAll);
btnWrap.children[0].addEventListener("click", modalBtnDelete);
btnWrap.children[1].addEventListener("click", modalBtnNone);
delChecked.addEventListener("click", removeChecked);
checkAll.addEventListener("click", function (e) {
	allCheckBox(e, this);
});
delAll.addEventListener("touchstart", function (e) {
	e.target.style.backgroundColor = "rgb(87, 10, 100)";
});
delAll.addEventListener("touchend", function (e) {
	e.target.style.backgroundColor = "rgba(87, 87, 87, 0.363)";
});
delChecked.addEventListener("touchstart", function (e) {
	e.target.style.backgroundColor = "rgb(87, 10, 100)";
});
delChecked.addEventListener("touchend", function (e) {
	e.target.style.backgroundColor = "rgba(87, 87, 87, 0.363)";
});
function deleteAll() {
	btnWrap.style.display = "block";
	if (!list.hasChildNodes() && !doneList.hasChildNodes()) {
		alert("삭제할 리스트가 없습니다!");
		testCheck(false);
	} else {
		displayStyle("block");
	}
}

function modalBtnDelete() {
	checked = document.querySelectorAll(".checkMark:checked").length;

	const checkBoxLength = document.querySelectorAll("li.checkMark").length,
		Rlist = document.querySelectorAll(".list");

	displayStyle("none");
	btnWrap.style.display = "none";

	for (let i = 0; i < Rlist.length; i++) {
		while (Rlist[i].hasChildNodes()) {
			Rlist[i].removeChild(Rlist[i].firstChild);
		}
	}
	targetRemoveStorage2();
	if (checkBoxLength !== checked) testCheck(false);
}

function modalBtnNone() {
	displayStyle("none");
	btnWrap.style.display = "none";
}

function removeChecked() {
	const checkedListTodo = document.querySelectorAll("#list .checkMark:checked"),
		checkedListDone = document.querySelectorAll("#doneList .checkMark:checked");

	if (checkedListTodo.length == 0 && checkedListDone.length == 0) {
		alert("선택한 리스트가 없습니다!");
	}

	removeEle(checkedListTodo);
	removeEle(checkedListDone);
	testCheck(false);

	targetRemoveStorage2();
	idReset();
}

function allCheckBox(e, selectAll) {
	const allCheckBox = document.querySelectorAll('input[type="checkbox"]');
	if (!list.hasChildNodes() && !doneList.hasChildNodes()) {
		alert("체크할 리스트가 없습니다!");
		//기존 클릭하면 체크되는 checkbox의 기본 기능 차단
		e.preventDefault();
	}
	allCheckBox.forEach(function (checkbox) {
		checkbox.checked = selectAll.checked;
	});
}

function removeEle(CLsit) {
	CLsit.forEach(function (ele) {
		let checkedEle = ele.parentElement;
		checkedEle.remove();
	});
}

function displayStyle(set) {
	checkRemoveAll.style.display = set;
	dim.style.display = set;
}
