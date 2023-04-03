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
            PageBuilder.displayRooms(response.rooms)
        })
    }

    sendPos(playerPosition){
        this.sock.emit('pos', playerPosition);
    }

    receiveCord(){
        return new Promise((resolve, reject) => {
            this.sock.once('getEnnemyPos', (data) => resolve(data))
        })
    }
}
