import SpriteSheet from './spriteSheet.js';
import { loadImage } from './loaders.js';

export function loadPersoSprites() {
    return loadImage('/image/perso.png').then(image => {
        const sprites = new SpriteSheet(image, 87, 87);
        sprites.defineTile('idle', 2, 0, 87, 87);

        return sprites;
    });
}

export function loadBackgroundSprites() {
    return loadImage('/image/tiles.png').then(image => {
        const sprites = new SpriteSheet(image, 16, 16);
        sprites.defineTile('slab', 1, 0);
        sprites.define('cornerstab', 2, 0);
        sprites.define('backGround', 1, 0);
        sprites.define('grass', 1, 4);
        sprites.define('cornergrass', 1, 0);
        sprites.define('backGround', 2, 2);
        sprites.defineTile('backGroundLight', 2, 6);
        return sprites;
    });
}