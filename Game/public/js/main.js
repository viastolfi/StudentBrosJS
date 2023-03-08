import Camera from './Camera.js';
import Timer from './Timer.js';
import { loadLevel } from './loaders.js';
import { createPlayer } from './entities.js';
import { setupKeyboard } from './input.js';
import { createCollisionLayer, createCameraLayer } from './layers.js';
import { setupMouseControl } from './debug.js';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

Promise.all([
    createPlayer(),
    loadLevel('1-1'),
])
    .then(([player, level]) => {
        const camera = new Camera();
        window.camera = camera;

        player.pos.set(64, 64);

        level.comp.layers.push(createCollisionLayer(level), createCameraLayer(camera));

        level.entities.add(player);

        const input = setupKeyboard(player);
        input.listenTo(window);

        //setupMouseControl(canvas, player, camera);


        const timer = new Timer(1 / 60);
        timer.update = function update(deltaTime) {
            level.update(deltaTime);

            level.comp.draw(context, camera);

            camera.pos.x = 0
            if (player.pos.x > camera.size.x / 2) {
                camera.pos.x = player.pos.x - camera.size.x / 2;
            }
        }

        timer.start();
    });