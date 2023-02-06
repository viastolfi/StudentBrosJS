const player = {
    host: false,
    roomId: null,
    username: "",
    socketId: "",
}

const sock = io();

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const roomId = urlParams.get('room');
const userNameInput = document.querySelector('#username');
const userCard = document.getElementById('user-card');
const linkToShare = document.getElementById('link-to-share');
const shareCard = document.getElementById('share-card');
const waitingArea = document.getElementById('waiting-area');
const chat = document.getElementById('chat-form');
const roomsCard = document.querySelector('#rooms-card');
const roomsList = document.querySelector('#rooms-list');
const disconnect = document.querySelector('#disconnect');

let friendUsername = "";

if(roomId){
    document.getElementById('start').innerText = 'Rejoindre';
    let button = document.getElementById('start');
    button.classList.add('hidden-element');
}

sock.emit('get rooms');

sock.on('list rooms', (rooms) => {
    let html = "";
    console.log(rooms);

    if(rooms.length > 0){
        rooms.forEach(room => {
            if(room.players.length <= 4){
                html += `<li>
                            <p>Salon de ${room.players[0].username} - ${room.id}</p>
                            <button class="join-room" data-room="${room.id}">Rejoindre</button>
                        </li>`;
            }
        });
    }

    if(html !== ""){
        roomsCard.classList.remove('hidden-element');
        roomsList.innerHTML = html;

        for(const element of document.getElementsByClassName('join-room')){
            element.addEventListener('click', joinRoom, false);
        }
    }
});

sock.on('message', (info) => {
    let parent = document.querySelector('#chat-box');

    let newElement = document.createElement('li');
    newElement.innerHTML = `${info['sender'].username}`+' - ' +info['text'];

    parent.appendChild(newElement);
});

sock.on('join room', (roomId) => {
    player.roomId = roomId;
    linkToShare.innerHTML = `<a href="${window.location.href}?room=${player.roomId}" target="_blank">${window.location.href}?room=${player.roomId}</a>`;
});

sock.on('start chat', (players) => {
    console.log(players);
    startChat(players);
});

const onFormSubmit = function(event){
    event.preventDefault();

    let input = document.querySelector('#chat');
    let info = {'text': input.value, 'player': player};

    input.value = '';

    sock.emit('message', info);
};

const joinRoom = function() {
    if(userNameInput.value !== ""){
        player.username = userNameInput.value;
        player.socketId = sock.id;
        player.roomId = this.dataset.room;

        sock.emit('playerData', player);

        userCard.hidden = true;
        waitingArea.classList.remove('hidden-element');
        roomsCard.classList.add('hidden-element');
    }
}

const onCreateRoom = function(event){
    event.preventDefault();

    player.username = userNameInput.value;

    if(roomId){
        player.roomId = roomId;
    }else{
        player.host = true;
    }

    player.socketId = sock.id;
    userCard.hidden = true;
    waitingArea.classList.remove('hidden-element');
    roomsCard.classList.add('hidden-element');

    sock.emit('playerData', player);
}

function startChat(players){
    waitingArea.classList.add('hidden-element');
    linkToShare.classList.add('hidden-element');
    shareCard.classList.add('hidden-element');
    chat.classList.remove('hidden-element');
    disconnect.classList.remove('hidden-element');

    const friend = players.find(p => p.socketId != player.socketId);
    friendUsername = friend.username;
}

function onDeconnection(){
    if(player.roomId !== null){
        sock.emit('deconnection', player);
        player.username = "";
        player.roomId = null;
        player.socketId = "";
        window.location.reload();
    }
    return null;
}


document.querySelector('#chat-form').addEventListener('submit', onFormSubmit);
document.querySelector('#form').addEventListener('submit', onCreateRoom);
disconnect.addEventListener('click', onDeconnection);