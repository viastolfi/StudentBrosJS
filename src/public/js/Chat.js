import { player, socket } from './main.js'

export default class Chat{
    constructor(roomId){
        this.players = [];
        this.roomId = roomId;
    }

    addUser(player){
        if(this.players.length <= 4){
            this.players.push(player);
        }
    }

    listenMessage(){
        sock.on('message', (info) => {
            let parent = document.querySelector('#chat-box');
        
            let newElement = document.createElement('li');
            newElement.innerHTML = `${info['sender'].username}`+' - ' +info['text'];
        
            parent.appendChild(newElement);
        });
    }
}
function onFormSubmit(event){
        event.preventDefault();

        console.log(player)

        let input = document.querySelector('#chat');
        let info = {'text': input.value, 'player': player};

        input.value = '';

        socket.sendMessage(info);
}
try{
    document.querySelector('#chat-form').addEventListener('submit', onFormSubmit);
}catch(e){
    console.log('grosse salope')
}