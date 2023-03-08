import { Vec2 } from './math.js';

export default class Entity {
    constructor() {
        jumping: true;
        this.pos = new Vec2(0, 0);
        this.vel = new Vec2(0, 0);
    }
}