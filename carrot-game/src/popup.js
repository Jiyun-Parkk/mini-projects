export default class Popup {
	constructor() {
		this.popup = document.querySelector(".pop-up");
		this.popMessage = document.querySelector(".pop-up_message");
		this.refresh = document.querySelector(".pop-up_refresh");
		this.refresh.addEventListener("click", () => {
			this.onClick && this.onClick();
			this.hide();
		});
	}
	setClickListener(onClick) {
		this.onClick = onClick;
	}
	showPopupWithText(text) {
		this.popup.style.display = "block";
		this.popMessage.innerHTML = text;
	}

	hide() {
		this.popup.style.display = "none";
	}
}
