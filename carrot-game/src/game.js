import * as sound from "./sound.js"; //sound라는 이름으로 모두 가져온다
import { Field, ItemType } from "./field.js";

//타입지정
export const Reason = Object.freeze({
	win: "win",
	lose: "lose",
	cancel: "cancel",
});

//builder pattertn
export class GameBuilder {
	withgameDuration(duration) {
		this.gameDuration = duration;
		return this;
	}
	withcarrotCount(num) {
		this.carrotCount = num;
		return this;
	}
	withbugCount(num) {
		this.bugCount = num;
		return this;
	}
	build() {
		return new Game(this.gameDuration, this.carrotCount, this.bugCount);
	}
}
class Game {
	constructor(gameDuration, carrotCount, bugCount) {
		this.gameDuration = gameDuration;
		this.carrotCount = carrotCount;
		this.bugCount = bugCount;

		this.gameTimer = document.querySelector(".game_timer");
		this.gameScore = document.querySelector(".game_score");
		this.gameBtn = document.querySelector(".game_button");
		this.gameBtn.addEventListener("click", () => {
			if (!this.started) {
				this.startGame();
			} else {
				this.finishiGame(Reason.cancel);
			}
		});

		this.gameField = new Field(carrotCount, bugCount);
		this.gameField.setClickListener(this.onItemClick);

		this.started = false;
		this.score = 0;
		this.timer = null;
	}
	setGameStopListener(onGameStop) {
		this.onGameStop = onGameStop;
	}
	startGame() {
		this.started = true;
		this.score = 0;
		sound.playBg();
		this.initGame();
		this.showStopButton();
		this.showTimerScore();
		this.startGameTimer();
	}

	finishiGame(reason) {
		this.started = false;
		this.stopGameTimer();
		this.gameBtn.style.visibility = "hidden";
		sound.stopBg();
		this.onGameStop && this.onGameStop(reason);
	}

	showStopButton() {
		this.gameBtn.style.visibility = "visible";
		const icon = this.gameBtn.querySelector(".fa-play");
		if (icon) {
			icon.classList.add("fa-stop");
			icon.classList.remove("fa-play");
		}
	}

	showTimerScore() {
		this.gameTimer.style.visibility = "visible";
		this.gameScore.style.visibility = "visible";
	}
	startGameTimer() {
		let remainingTimeSec = this.gameDuration;
		this.updateTimerText(remainingTimeSec);
		this.timer = setInterval(() => {
			if (remainingTimeSec <= 0) {
				clearInterval(this.timer);
				this.finishiGame(Reason.lose);
				return;
			}
			this.updateTimerText(--remainingTimeSec);
		}, 1000);
	}

	stopGameTimer() {
		clearInterval(this.timer);
	}
	updateTimerText(sec) {
		const minutes = Math.floor(sec / 60);
		const seconds = sec % 60;
		this.gameTimer.innerText = `${minutes}:${seconds}`;
	}
	initGame() {
		// 벌레와 당근을 생성하고 추가
		this.gameField.init();
		this.gameScore.innerText = this.carrotCount;
	}
	updateScoreBoard() {
		this.gameScore.innerText = this.carrotCount - this.score;
	}
	onItemClick = (item) => {
		if (!this.started) return;
		if (item === ItemType.carrot) {
			this.score++;
			this.updateScoreBoard();
			if (this.score === this.carrotCount) {
				this.finishiGame(Reason.win);
			}
		} else if (item === ItemType.bug) {
			this.finishiGame(Reason.lose);
		}
	};
}
