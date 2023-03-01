import { socket } from './main.js'

socket.getCanva();

const controller = {
	left: false,

	keyListener: function (event) {
		var key_state = (event.type == "keydown") ? true : false;

		switch(event.keyCode) {
			case 81 : // gauche
				controller.left = key_state;
				break;
		}
	}
}

function update() {
	if(controller.left) {
		socket.sendMovement('left');
	}

	requestAnimationFrame(update);
}

update();

window.addEventListener("keydown", controller.keyListener)
window.addEventListener("keyup", controller.keyListener);
