import SpriteSheet from './spriteSheet.js';
import { loadImage } from './loaders.js';

export function loadPersoSprite() {
    return loadImage('/image/characters.gif').then(image => {
        const sprites = new SpriteSheet(image, 16, 16);
        sprites.define('idle', 276, 44, 16, 16);
        return sprites;
    });
}

export function loadBackgroundSprites() {
    return loadImage('/image/tiles.png').then(image => {
        const sprites = new SpriteSheet(image, 16, 16);
        sprites.defineTile('ground', 1, 0);
        sprites.defineTile('cornerstab', 2, 0);
        sprites.defineTile('flag', 3, 3);
        sprites.defineTile('grass', 1, 4);
        sprites.defineTile('cornergrass', 1, 0);
        sprites.defineTile('backGround', 2, 2);
        sprites.defineTile('backGroundLight', 2, 6);
        return sprites;
    });
}