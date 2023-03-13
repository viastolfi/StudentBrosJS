const { Socket } = require('socket.io');
const express = require('express');

const app = express();
const http = require('http').createServer(app);
const path = require('path');
const port = 8080;

app.use(express.static('public'));

let roomArray = []

http.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`)
})


const io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/game', (req, res) => {
	res.sendFile(path.join(__dirname, '/public/game.html'));
})

app.all('/multijoueurs', function(req, res) {
    res.sendFile(__dirname+'/public/multiplayerHomePage.html');
});
	
module.exports = {
    io,
    roomArray,
}


app.all('/multijoueurs', function (req, res) {
    res.sendFile(__dirname+'/public/multiplayerHomePage.html')
});


const { Room } = require(`${__dirname}/room.js`);
const { createFirstCanvas } = require(`${__dirname}/canvasCreator.js`);

// le socket s'ouvre lors de la connection d'un client
io.on('connection', (socket) => {
    // la console du serveur est visible dans le terminal ou vous avez lancer le serveur
    console.log('New person connected');

	socket.on('getCanva', () => {
		canva = createFirstCanvas();	
        let buffer = canva.toBuffer('image/png');
		socket.emit('playerRender', buffer);
	});

	// lorsqu'un socket portant le nom 'hello' est reçu fait l'action suivante
    socket.on('hello', (callback) => {
        // renvoie la réponse au socket directement (en JSON)
        callback({
            message : "World"
        });
    });
    socket.on('get rooms', () => {
        io.to(socket.id).emit('list rooms', roomArray);
    })

    socket.on('player data', (player) => {
        console.log(`[connection] ${player.username}`);
    
        let room = null;

        if(!player.roomId){
            room = new Room()
            roomArray.push(room);
            console.log(`[create room] - ${room.id} - ${player.username}`);
        }else{
            room = roomArray.find(r => r.id === player.roomId);

            if(room === undefined){
                return;
            }
        }

        player.roomId = room.id;
        room.players.push(player);

        socket.join(room.id);

        io.to(socket.id).emit('join room', room.id);
    
        if(room.players.length >= 2 && room.players.length <= 4){
            io.to(room.id).emit('start game', room.players);
        }
    });

	socket.on('moove', (movement) => {
		console.log('test');
		console.log(movement);
	});
});
