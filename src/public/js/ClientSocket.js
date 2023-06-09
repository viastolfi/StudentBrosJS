import PageBuilder from "./PageBuilder.js";

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
            console.log(players);
        })
    }

	sendMovement(moove){
		this.sock.emit('moove', moove);
	}

	getCanva() {
		this.sock.emit('getCanva');
		this.sock.on('playerRender', (IncomeBuffer) => {
            let base64 = this.arrayBufferToBase64(IncomeBuffer);
            const myCanvas = document.getElementById('screen'); 
            const myContext = myCanvas.getContext('2d');
            
            let image = new Image();
            image.onload = function() {
                myContext.drawImage(image, 0, 0);
            };
            image.src = "data:image/png;base64,"+base64;
        })
	}

    arrayBufferToBase64(buffer){
        let binary = '';
        let bytes = new Uint8Array(buffer);
        let len = bytes.byteLength;
        for(let i=0; i < len; i++){
            binary += String.fromCharCode( bytes[i] );
        }
        return window.btoa(binary);
    }
}
