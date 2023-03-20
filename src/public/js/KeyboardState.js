const PRESSED = 1;
const RELEASED = 0;

export default class KeyboardState {
    constructor() {
        // Garde l'état d'une key
        this.keyStates = new Map();

        // Contient les fonctions de rappel d'une key
        this.keyMap = new Map();
    }

    addMapping(code, callback) {
        this.keyMap.set(code, callback);
    }

    handleEvent(event) {
        const {code} = event;

        if (!this.keyMap.has(code)) {
            // Si le Keycode est inconnue
            return;
        }

        //Priorise l'event d'input
        event.preventDefault();

        const keyState = event.type === 'keydown' ? PRESSED : RELEASED;

        if (this.keyStates.get(code) === keyState) {
            return;
        }

        this.keyStates.set(code, keyState);

        this.keyMap.get(code)(keyState);
    }

    listenTo(window) {
        ['keydown', 'keyup'].forEach(eventName => {
            window.addEventListener(eventName, event => {
                this.handleEvent(event);
            });
        });
    }
}