const { Socket } = require('socket.io');

const express = require('express');

const app = express();
const http = require('http').createServer(app);
const clientPath = `${__dirname}/../client/`;
const port = 8080;

const io = require('socket.io')(http);

app.use(express.static(clientPath));

app.get('/', (req, res) => {
    res.sendFile(clientPath);
});

http.listen(port, () => {
    console.log(`Listening on htpp://localhost:${port}/`)
});

let rooms = [];

io.on('connection', (sock) => {

    sock.on('playerData', (player) => {
        console.log(`[connection] ${player.username}`);

        let room = null;

        if(!player.roomId){
            room = createRoom(player);
            console.log(`[create room] - ${room.id} - ${player.username}`);
        }else{
            room = rooms.find(r => r.id === player.roomId);

            if(room === undefined){
                return;
            }

            player.roomId = room.id;
            room.players.push(player);
        }

        sock.join(room.id);

        io.to(sock.id).emit('join room', room.id);

        if(room.players.length === 2){
            io.to(room.id).emit('start chat', room.players);
        }
    });

    sock.on('message', (info) => {
        let room = info['player'].roomId;
        let text = info['text'];

        let out = {'text': text, 'sender': info['player']};

        io.to(room).emit('message', out);
    });

    sock.on('get rooms', () => {
        io.to(sock.id).emit('list rooms', rooms);
    });
});

function createRoom(player){
    const room = {
        id: roomId(),
        players: []
    };

    player.roomId = room.id;
    room.players.push(player);
    rooms.push(room);

    return room;
}

function roomId(){
    return Math.random().toString(36).substr(2, 9);
}