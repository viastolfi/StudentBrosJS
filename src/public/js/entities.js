import Entity from './Entity.js';
import Go from './traits/Go.js';
import Jump from './traits/Jump.js';
import { loadPersoSprite } from './sprites.js';

export function createPlayer() {
    return loadPersoSprite()
        .then(sprite => {
            const player = new Entity();
            player.size.set(14, 16);

            player.addTrait(new Go());
            player.addTrait(new Jump());

            player.draw = function drawPlayer(context) {
                sprite.draw('idle', context, 0,0);
            }

            return player;
        });
}