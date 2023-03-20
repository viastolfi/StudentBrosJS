import Entity from './Entity.js';
import Go from './traits/Go.js';
import Jump from './traits/Jump.js';
import { loadPersoSprite } from './sprites.js';

export function createPlayer() {
    return loadPersoSprite()
        .then(sprite => {
            const player = new Entity();
            player.size.set(14, 16);        //Definie la taille

             //Ajoute des caractéristiques

            player.addTrait(new Go());
            player.addTrait(new Jump());

            //Dessine la sprite 'idle' du joueur dans le context

            player.draw = function drawPlayer(context) {
                sprite.draw('idle', context, 0,0);
            }

            return player;
        });
}