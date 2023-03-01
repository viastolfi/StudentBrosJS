import { CONTROLLER } from './KeyboardImput.js';

export default function move() {
    if (CONTROLLER.up && player.jumping == false) {  // Reset le saut si le joueur touche le sol et appuie sur espace
        player.vel.y -= 20;
        player.jumping = true;

    }

    if (CONTROLLER.left) {
        player.vel.x -= 1;
    }

    if (CONTROLLER.right) {
        player.vel.x += 1;
    }

    player.vel.y += 1.5; // gravité
    player.update();
    player.vel.x *= 0.8;// friction
    player.vel.y *= 0.9;// friction
}