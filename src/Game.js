const uuid = require('uuid');

class Game {
    constructor(id, username, id2, username2){
        this.id = uuid.v4();
        this.player1 = id;
        this.player2 = id2; 
        this.players = {};
        this.players[id] = {name: username.toString(), pos: [64, 192]};
        this.players[id2] = {name: username2.toString(), pos: [64, 192]};
    }
}

module.exports = Game;