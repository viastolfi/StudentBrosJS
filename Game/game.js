const context = document.querySelector("canvas").getContext("2d");

context.canvas.height = 400;
context.canvas.width = 1220;

// Compteur de niveau
let frameCount = 1;
// Met le même nbr d'obstacle que de niveau
let obCount = frameCount;
// Liste de coordonée X aléatoire (pour faire spawn les obstacles)
const obXCoors = [];

// Le joueur
const square = {

    height: 32,
    jumping: true,
    width: 32,
    x: 0,
    xVelocity: 0,
    y: 0,
    yVelocity: 0

};

// Créer un objet à chaque nouveaux niveaux
function nextFrame(){

    frameCount++;

    for (let i = 0; i < obCount; i++) {
        // Coordoné X random pour l'obstacle
        obXCoor = Math.floor(Math.random() * (1165 - 140 + 1) + 140);
        obXCoors.push(obXCoor);
    }
}

const controller = {

    left: false,
    right: false,
    up: false,
    keyListener: function (event) {

        var key_state = (event.type == "keydown") ? true : false;

        switch (event.keyCode) {

            case 81:// gauche
                controller.left = key_state;
                break;
            case 32:// saut
                controller.up = key_state;
                break;
            case 68:// droit
                controller.right = key_state;
                break;
            //case echap pour le menu
            //case clickGauche pour projectils ?
        }
    }
};

const loop = function () {

    if (controller.up && square.jumping == false) {  // Reset le saut si le joueur touche le sol et appuie sur espace

        square.yVelocity -= 20;
        square.jumping = true;

    }

    if (controller.left) {

        square.xVelocity -= 1;

    }

    if (controller.right) {

        square.xVelocity += 1;

    }

    square.yVelocity += 1.5;// gravité
    square.x += square.xVelocity;
    square.y += square.yVelocity;
    square.xVelocity *= 0.9;// friction
    square.yVelocity *= 0.9;// friction

    // Faux système de collision pour arreté le perso à une certaine hauteur (C'est nul, voir collision !)
    if (square.y > 386 - 16 - 32) {

        square.jumping = false;
        square.y = 386 - 16 - 32;
        square.yVelocity = 0;

    }

    // Collision mur de gauche
    if (square.x < -0) {

        square.x = 0;

    } else if (square.x > 1220) {// niveau suivant 

        square.x = -20;
        nextFrame();

    }
    // Remplissage du fond
    context.fillStyle = "#201A23"; // bleu foncé
    context.fillRect(0, 0, 1220, 400); // x, y, width, height


    // Visuel du cube
    context.fillStyle = "#8DAA9D"; // bleu claire
    context.beginPath();
    context.rect(square.x, square.y, square.width, square.height);
    context.fill();


    // Créer les obstacles à chaque nouvelle frame

    const height = 50; // taille obstacle

    context.fillStyle = "#FBF5F3"; // couleur obstacle (blanc)
    obXCoors.forEach((obXCoor) => {  // Créer les objets en fonction des coordonnées aléatoires sur X
        context.beginPath();  // Création curseur pour dessiner dans le canvas

        context.moveTo(obXCoor, 385); // x = random, y = coordonnée du sol
        context.lineTo(obXCoor + 20, 385); // x = random + 20, y = coordonnée du sol
        context.lineTo(obXCoor + 10, 385 - height); // x = random + 10, y = taille triangle

        context.closePath();
        context.fill(); // Remplit le dessin sur le Canvas
    })


    // Créer le sol
    context.strokeStyle = "#2E2532";
    context.lineWidth = 30;
    context.beginPath();
    context.moveTo(0, 385);
    context.lineTo(1220, 385);
    context.stroke(); // Dessine sur le canvas

    // relance la loop quand le moteur de recherche est prêt (pratique asf)
    window.requestAnimationFrame(loop);

};

window.addEventListener("keydown", controller.keyListener)
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(loop);