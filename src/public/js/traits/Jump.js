import Trait from '../Trait.js';

export default class Jump extends Trait {
    constructor() {
        super('jump');

        this.duration = 0.3;
        this.engageTime = 0;
        this.canJump = false;

        this.velocity = 200;
    }

    start() {
        this.engageTime = this.duration;
    }

    cancel() {
        this.engageTime = 0;
        this.canJump = false;
    }

    update(entity, deltaTime) {
        if (this.engageTime > 0 && this.canJump) {
            entity.vel.y = -this.velocity;
            this.engageTime -= deltaTime;
        }
    }
}