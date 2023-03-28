import Camera from './Camera.js';
import Timer from './Timer.js';
import { loadLevel } from './loaders.js';
import { createPlayer } from './entities.js';
import { setupKeyboard } from './input.js';
import { createCollisionLayer } from './layers.js';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

const currentLevel = '1-1';

Promise.all([
    createPlayer(),
    loadLevel(currentLevel)
])
    .then(([player,level]) => {

        const camera = new Camera();
        window.camera = camera;

        level.comp.layers.push(createCollisionLayer(level));
    
        player.pos.set(64, 64);
        level.entities.add(player);

        const input = setupKeyboard(player);
        input.listenTo(window);
        

        const timer = new Timer(1 / 60);

        timer.update = function update(deltaTime) {
            
            level.update(deltaTime);
             
            level.comp.draw(context, camera);

            camera.setPos(player);
        }

        timer.start();
    });