import Keyboard from './KeyboardState.js';

export function setupKeyboard(entity) {
    const input = new Keyboard();

    //Associe certaines touches aux les fonctionnalitées saut, avancer, reculer

    input.addMapping('Space', keyState => {
        if (keyState) {
            entity.jump.start();
        } else {
            entity.jump.cancel();
        }
    });

    input.addMapping('ArrowRight', keyState => {
        entity.go.dir = keyState;
    });

    input.addMapping('ArrowLeft', keyState => {
        entity.go.dir = -keyState;
    });

    return input;
}
