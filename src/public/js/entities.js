import Entity from './Entity.js';
import { loadPersoSprites } from './sprites.js';

export function createPlayer() {
    return loadPersoSprites().then(sprite => {
        const player = new Entity();
        player.pos.set(64, 64);
        player.vel.set(2, -10);

        player.draw = function drawPlayer(context) {
            sprite.draw('idle', context, this.pos.x, this.pos.y);
        }

        player.update = function updatePlayer() {
            this.pos.x += this.vel.x;
            this.pos.y += this.vel.y;
        }
        return player;
    });
}
