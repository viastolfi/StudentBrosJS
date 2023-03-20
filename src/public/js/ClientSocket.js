import PageBuilder from "./PageBuilder.js";

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
        })
    }

    getRoomList(){
        this.sock.emit('getRooms', (response) => {
            console.log(response.rooms);
            PageBuilder.displayRooms(response.rooms)
        })
    }
}
