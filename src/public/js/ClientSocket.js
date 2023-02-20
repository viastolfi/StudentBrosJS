import PageBuilder from "./PageBuilder.js";
import Chat from "./Chat.js"

export default class ClientSocket{
    constructor(){
        this.sock = io();
    }

    askForWorld(){
        // envoie un soket avec le nom 'hello' au serveur et attend une réponse
        this.sock.emit('hello', (response) => {
            // lorsque la réponse est reçu créer le nouvel élément
            let pageBuilder = new PageBuilder()
            let parent = document.querySelector('#container')
            pageBuilder.addElement(response.message, parent);
        });
    }

    getRoomList(){
        this.sock.emit('get rooms');
        this.sock.on('list rooms', (roomArray) => {
            let pageBuilder = new PageBuilder;
            pageBuilder.displayRooms(roomArray);
        });
    }

    sendPlayerData(player){
        this.sock.emit('player data', player);
        this.sock.on('join room', (roomId) => {
            player.roomId = roomId;
        })
        this.startGame();
    }

    startGame(){
        this.sock.on('start game', (players) => {
            window.location.href = './multiplayerGame.html';
            let chat = new Chat(this.sock);
            console.log(players)
            chat.listenMessage();
        })
    }
}