import Compositor from './Compositor.js';
import { loadLevel } from './loaders.js';
import { createPlayer } from './entities.js';
import { loadBackgroundSprites } from './sprites.js';
import { createBackgroundLayer, createSpriteLayer } from './layers.js';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');


const controller = {

    left: false,
    right: false,
    up: false,
    keyListener: function (event) {

        var key_state = (event.type == "keydown") ? true : false;

        switch (event.keyCode) {

            case 81:// gauche
                controller.left = key_state;
                break;
            case 32:// saut
                controller.up = key_state;
                break;
            case 68:// droit
                controller.right = key_state;
                break;
            //case echap pour le menu
            //case clickGauche pour projectils ?
        }
    }
};


Promise.all([
    createPlayer(),
    loadBackgroundSprites(),
    loadLevel('1-1'),
])
    .then(([player, backgroundSprites, level]) => {
        const comp = new Compositor();
        comp.layers.push(createBackgroundLayer(level.backgrounds, backgroundSprites));
        comp.layers.push(createSpriteLayer(player));


        function update() {

            if (controller.up && player.jumping == false) {  // Reset le saut si le joueur touche le sol et appuie sur espace
                player.vel.y -= 20;
                player.jumping = true;

            }

            if (controller.left) {
                player.vel.x -= 1;
            }

            if (controller.right) {
                player.vel.x += 1;
            }

            player.vel.y += 1.5; // gravit�
            player.update();
            player.vel.x *= 0.9;// friction
            player.vel.y *= 0.9;// friction

            // Faux syst�me de collision pour arret� le perso � une certaine hauteur (C'est nul, voir collision !)
            if (player.pos.y > 624 - 87) {
                player.jumping = false;
                player.pos.y = 624 - 87;
                player.vel.y = 0;
            }

            // Collision mur de gauche
            if (player.pos.x < -20) {
                player.pos.x = -20;

            } else if (player.pos.x > 1500 - 62) {

                player.pos.x = 1500 - 62

            }
            comp.draw(context);
            requestAnimationFrame(update);
        }

        update();
    });


window.addEventListener("keydown", controller.keyListener)
window.addEventListener("keyup", controller.keyListener);


/*
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
*/