function Game() {
    let canvas = this.getCanvas();

    this.mouseX = this.mouseY = 0;
    this.gridX = this.gridY = -1;
    this.gridWall = true;

    this.jumpDown = false;
    this.leftDown = false;
    this.rightDown = false;

    // Crée la grille qui défini la map
    this.grid = new PlatformerGrid(
        Math.floor(canvas.width / this.GRID_RESOLUTION),
        Math.floor(canvas.height / this.GRID_RESOLUTION),
        this.GRID_RESOLUTION);

    for (let x = 0; x < this.grid.width; ++x)
        this.grid.setCeiling(x, this.grid.height - 1, true);

    // Créé un joueur
    this.player = new PlatformerNode(
        this.PLAYER_SPAWN_X,
        this.PLAYER_SPAWN_Y,
        this.PLAYER_SIZE,
        this.PLAYER_SIZE);
    this.grid.addNode(this.player);

    this.addListeners();
};

Game.prototype = {
    GRID_RESOLUTION: 32,
    PLAYER_SIZE: 24,
    PAINT_STROKE_STYLE: "lime",
    ERASE_STROKE_STYLE: "red",
    PLAYER_JUMP_SPEED: -650,
    PLAYER_WALK_SPEED: 270,
    PLAYER_WALK_ACCELERATION: 3500,
    PLAYER_SPAWN_X: 100,
    PLAYER_SPAWN_Y: 100,
    KEY_JUMP: 32,            // Caractère Ascii pour espace
    KEY_LEFT: 81,            // Caractère Ascii pour déplacement gauche
    KEY_RIGHT: 68,           // Caractère Ascii pour déplacement droite

    addListeners() {
        this.getCanvas().addEventListener("click", this.mouseClick.bind(this));
        this.getCanvas().addEventListener("mousemove", this.mouseMove.bind(this));
        this.getCanvas().addEventListener("mouseout", this.mouseLeave.bind(this));

        window.addEventListener("keydown", this.keyDown.bind(this));
        window.addEventListener("keyup", this.keyUp.bind(this));
    },

    getCanvas() {
        return document.getElementById("renderer");
    },

    run() {
        this.lastTime = new Date();

        window.requestAnimationFrame(this.animate.bind(this));
    },

    keyDown(e) {
        switch (e.keyCode) {
            case this.KEY_JUMP:
                if (!this.jumpDown && this.player.onGround) {
                    this.jumpDown = true;
                    this.player.setvy(this.PLAYER_JUMP_SPEED);
                }

                break;
            case this.KEY_RIGHT:
                this.rightDown = true;
                break;
            case this.KEY_LEFT:
                this.leftDown = true;
                break;
        }
    },

    keyUp(e) {
        switch (e.keyCode) {
            case this.KEY_JUMP:
                this.jumpDown = false;
                break;
            case this.KEY_RIGHT:
                this.rightDown = false;
                break;
            case this.KEY_LEFT:
                this.leftDown = false;
                break;
        }
    },

    mouseClick(e) {
        //fonction de tir ?
    },

    mouseMove(e) {
        const bounds = this.getCanvas().getBoundingClientRect();

        this.mouseX = e.clientX - bounds.left;
        this.mouseY = e.clientY - bounds.top;
        this.gridX = Math.floor(this.mouseX / this.GRID_RESOLUTION);
        this.gridY = Math.floor(this.mouseY / this.GRID_RESOLUTION);

        this.findSelectedEdge();
    },


    mouseLeave(e) {
        this.gridX = this.gridY = -1;
    },

    animate() {
        let time = new Date();
        let timeStep = (time.getMilliseconds() - this.lastTime.getMilliseconds()) / 1000;
        if (timeStep < 0)
            timeStep += 1;

        this.lastTime = time;

        this.movePlayer(timeStep);
        this.grid.update(timeStep);
        this.render(timeStep);

        window.requestAnimationFrame(this.animate.bind(this));
    },

    movePlayer(timeStep) {
        if (this.rightDown) {
            this.player.setvx(Math.min(this.player.vx + this.PLAYER_WALK_ACCELERATION * timeStep, this.PLAYER_WALK_SPEED));
        }

        if (this.leftDown) {
            this.player.setvx(Math.max(this.player.vx - this.PLAYER_WALK_ACCELERATION * timeStep, -this.PLAYER_WALK_SPEED));
        }

        // LE RESPAWN QUAND ON SORT DE LA MAP  (A ENLEVER APRES SUIVI CAMERA)

        if (
            this.player.x < -this.player.width ||
            this.player.y < -this.player.height ||
            this.player.x > this.getCanvas().width ||
            this.player.y > this.getCanvas().height)
        {
            this.player.x = this.PLAYER_SPAWN_X;
            this.player.y = this.PLAYER_SPAWN_Y;
        }
    },

    render(timeStep) {
        let canvas = this.getCanvas();
        let context = canvas.getContext("2d");

        // Clear canvas pour permettre d'actualisé l'état du joueur
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = "white";
        context.beginPath();
        context.rect(0, 0, canvas.width, canvas.height);
        context.fill();

        this.grid.draw(context);
    }
};