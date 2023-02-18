const sock = io()
import PageBuilder from "./pageBuilder.js";

export default class ClientSocket{
    constructor(){}

    askForWorld(){
        // envoie un soket avec le nom 'hello' au serveur et attend une réponse
        sock.emit('hello', (response) => {
            // lorsque la réponse est reçu créer le nouvel élément
            let pageBuilder = new PageBuilder()
            let parent = document.querySelector('#container')
            pageBuilder.addElement(response.message, parent);
        });
    }

    getRoomList(){
        sock.emit('get rooms');
        sock.on('list rooms', (roomArray) => {
            let pageBuilder = new PageBuilder;
            pageBuilder.displayRooms(roomArray);
        });
    }

    sendPlayerData(player){
        sock.emit('player data', player);
    }
}