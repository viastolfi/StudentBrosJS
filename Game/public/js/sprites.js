import SpriteSheet from './spriteSheet.js';
import { loadImage } from './loaders.js';

export function loadPersoSprite() {
    return loadImage('/image/perso.png').then(image => {
        const sprites = new SpriteSheet(image, 87, 87);
        sprites.defineTile('idle', 2, 0, 87, 87);
        sprites.defineTile('left', 3, 0, 87, 87);
        return sprites;
    });
}


export function loadBackgroundSprites() {
    return loadImage('/image/tiles.png').then(image => {
        const sprites = new SpriteSheet(image, 16, 16);
        sprites.defineTile('ground', 1, 0);
        sprites.defineTile('cornerstab', 2, 0);
        sprites.defineTile('backGround', 1, 0);
        sprites.defineTile('grass', 1, 4);
        sprites.defineTile('cornergrass', 1, 0);
        sprites.defineTile('backGround', 2, 2);
        sprites.defineTile('backGroundLight', 2, 6);
        return sprites;
    });
}