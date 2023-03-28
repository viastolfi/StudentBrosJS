import { Vec2 } from './math.js';

export default class Game{
    constructor(player){
        this.player = player;
        this.pos = new Vec2(0, 0);
        this.isMulti = false;
    }
}