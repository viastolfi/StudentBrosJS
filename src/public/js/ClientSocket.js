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
        this.startGame(player);
    }

    startGame(player){
        this.sock.on('start game', (players) => {
            window.location.href = './multiplayerGame.html';
            let chat
            if(player.isHost){
                chat = new Chat(player.roomId);
            }else{
                
            }
            chat.addUser(player);
            console.log(players)
            chat.listenMessage();
        })
    }

    sendMessage(info){
        this.sock.emit('message', info);
    }
}