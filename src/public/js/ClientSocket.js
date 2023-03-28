import PageBuilder from "./PageBuilder.js";
import { game } from './multiplayerMain.js'

export default class ClientSocket{
    constructor(){
        this.sock = io();
    }

    sendPlayerData(username, roomId){
        this.sock.emit('player data', {username: username, roomId: roomId});
        this.startGame();
    }

    startGame(){
        this.sock.on('start game', () => {
            PageBuilder.CreateGame();
            game.isMulti = true;
        })
    }

    getRoomList(){
        this.sock.emit('getRooms', (response) => {
            console.log(response.rooms);
            PageBuilder.displayRooms(response.rooms)
        })
    }

    sendPos(playerPosition){
        this.sock.emit('pos', playerPosition);
    }

    receiveCord(){
        this.sock.on('getEnnemyPos', function(data) {
            console.log(data);
        })
    }
}
