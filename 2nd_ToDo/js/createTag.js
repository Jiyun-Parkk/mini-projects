"use strict";

function createTagsTodo(listClass, checkId, innTxt, ele, listLength) {
    const plusList = makeEle({
        tag: "li",
        class: listClass,
    });

    const checkBox = makeEle({
        tag: "input",
        type: "checkbox",
        class: "checkMark",
        id: checkId + listLength,
    });

    const label = makeEle({
        tag: "label",
        class: "label",
        html: "<span></span>",
    });
    label.setAttribute("for", checkId + listLength);

    const createText = makeEle({
        tag: "div",
        class: "innerText",
        txtCont: innTxt,
    });
    const doneBox = makeEle({
        tag: "span",
        class: "doneBox",
        html: "<i class='fas fa-check'></i>",
    });

    const removeBtn = makeEle({
        tag: "button",
        type: "button",
        class: "removeBtn",
        html: "<i class='fas fa-times'></i>",
    });
    const editText = makeEle({
        tag: "button",
        type: "button",
        class: "editBtn",
        html: "<i class='far fa-edit'></i>",
    });

    ele.append(plusList);
    plusList.append(checkBox, label, createText, doneBox, editText, removeBtn);

    const allList = document.querySelectorAll(".list li");

    checkOne(allList);
    removeCurrentList(removeBtn);
    toggleCheck(doneBox);
    createEditor(editText);
}

function createEditor(editText) {
    editText.addEventListener("click", function (e) {
        cTarget = e.currentTarget.parentElement.children[2];
        const editbox = makeEle({
            tag: "input",
            type: "text",
            class: "editBox",
        });
        editbox.setAttribute("maxLength", "20");
        const cancleBtn = makeEle({
            tag: "button",
            type: "button",
            class: "cancle",
            html: "<i class='fas fa-times'></i>",
        });
        const rightCheck = makeEle({
            tag: "button",
            type: "submit",
            class: "submit",
            html: "<i class='far fa-thumbs-up'></i>",
        });

        editText.replaceWith(rightCheck);
        cTarget.append(editbox, cancleBtn);
        editbox.focus();

        rightCheck.addEventListener("click", function (e) {
            editValueCheck(e);
        });
        cancleBtn.addEventListener("click", cancleEdit);

        editbox.addEventListener("keyup", function (e) {
            switch (e.keyCode) {
                case 13:
                    rightCheck.click();
                    break;
                case 27:
                    cancleEdit();
                    break;
            }
        });

        function editValueCheck(e) {
            cTarget = e.currentTarget.parentElement;

            if (!editbox.value || editbox.value.trim() == "") {
                alert("수정할 내용을 적어주세요!");
                editbox.value = "";
                editbox.focus();
                return false;
            }
            cTarget.children[2].innerText = editbox.value;
            editbox.remove();
            e.currentTarget.replaceWith(editText);
            targetRemoveStorage1(cTarget);
        }

        function cancleEdit() {
            editbox.remove();
            cancleBtn.remove();
            rightCheck.replaceWith(editText);
        }
    });
}

function makeEle(data) {
    let makeTags = null;
    if (data.tag) {
        makeTags = document.createElement(data.tag);
    }
    if (makeTags && data.class) {
        makeTags.className = data.class;
    }
    if (makeTags && data.id) {
        makeTags.id = data.id;
    }
    if (makeTags && data.html) {
        makeTags.innerHTML = data.html;
    }
    if (makeTags && data.txtCont) {
        makeTags.textContent = data.txtCont;
    }
    if (makeTags && data.type) {
        makeTags.type = data.type;
    }

    return makeTags;
}
