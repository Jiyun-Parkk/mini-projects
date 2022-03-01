import { GameBuilder, Reason } from "./game.js";
import * as sound from "./sound.js";
import Popup from "./popup.js";

const gameFinishiBanner = new Popup();

//어떤값을 넣었는지 알수 있다.
const game = new GameBuilder()
	.withgameDuration(15)
	.withcarrotCount(15)
	.withbugCount(15)
	.build();

game.setGameStopListener((reason) => {
	let message;
	switch (reason) {
		case Reason.cancel:
			message = "Replay?";
			sound.playAlert();
			break;
		case Reason.win:
			message = "You Won!👏";
			sound.playWin();
			break;
		case Reason.lose:
			message = "You Lost!😭";
			sound.playBug();
			break;
		default:
			throw new Error("not valid reason");
	}
	gameFinishiBanner.showPopupWithText(message);
});

gameFinishiBanner.setClickListener(() => game.startGame());
