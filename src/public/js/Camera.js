import {Vec2} from './math.js';

export default class Camera {
    constructor() {
        this.pos = new Vec2(0, 0);
        this.size = new Vec2(500, 224);
    }

    setPos(player) {
        if (player.pos.x > this.size.x / 2) {
            this.pos.x = player.pos.x - this.size.x / 2;
        }
    }
}