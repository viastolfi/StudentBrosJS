const { io } = require(`${__dirname}/app.js`);
const { roomArray } = require(`${__dirname}/app.js`);
const { Room } = require(`${__dirname}/room.js`);

// le socket s'ouvre lors de la connection d'un client
io.on('connection', (socket) => {
    // la console du serveur est visible dans le terminal ou vous avez lancer le serveur
    console.log('New person connected');

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
});