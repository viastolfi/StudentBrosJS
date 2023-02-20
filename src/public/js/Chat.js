export default class Chat{
    constructor(socket){
        this.sock = socket;
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

        console.log('teeeest');

        let input = document.querySelector('#chat');
        let info = {'text': input.value, 'player': player};

        input.value = '';

        sock.emit('message', info);
}
document.querySelector('#chat-form').addEventListener('submit', onFormSubmit);
