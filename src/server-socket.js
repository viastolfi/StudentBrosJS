const uuid = require('uuid');
const { io } = require(`${__dirname}/app.js`);
var Game = require(`${__dirname}/Game.js`);

let users = {};
let matchmaking = [];
let games = {};
let rooms = [];

class Room {
    constructor(player){
        this.id = uuid.v4();
        this.players = [];
        this.players.push(player);
    }
}

class User {
    constructor(socket){
        this.socket = socket;
        this.username = socket.id;
        this.game = { id: null, playing: false};
        this.player2 = null;
    };
}

// le socket s'ouvre lors de la connection d'un client
io.on('connection', (socket) => {
    console.log(`New client connected : ${socket.id}`);
    users[socket.id] = new User(socket);

    socket.on('player data', function(data) {
        users[socket.id].username = data.username;
        if(matchMaker(socket.id)){
            io.to(socket.id).emit('start game')
        }
    })

    socket.on('getRooms', (callback) => {
        callback({
            rooms: rooms,
        })
    })

    socket.on('pos', function(data) {
        //console.log(data)
        io.to(socket.id).emit('getEnnemyPos', data);
    })
});

function matchMaker(socketId) {
    if(matchmaking.length != 0 ){
        let game = new Game(
            matchmaking[0],
            users[matchmaking[0]].username,
            socketId,
            users[socketId].username
        );

        games[game.id] = game;

        /*
        users[matchmaking[0]].game.id = game.id;
		users[new_player].game.id = game.id;
		users[matchmaking[0]].game.playing = true;
		users[new_player].game.playing = true;
        */

        users[matchmaking[0]].socket.emit('start game', {
            username: users[matchmaking[0]].username,
			player: 1,
			opp_username: users[socketId].username,
        })

        users[socketId].socket.emit('game-started', {
			username: users[socketId].username,
			player: 2,
			opp_username: users[matchmaking[0]].username
		});;

        console.log(`Game ${game.id} has started.`);
		matchmaking = [];
        return true;
    }else{
        rooms.push(new Room(socketId))
        matchmaking.push(socketId);
        return false;
    }
}