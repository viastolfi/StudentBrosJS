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

if(roomId){
    document.getElementById('start').innerText = 'Rejoindre';
}

const userNameInput = document.querySelector('#username');

const userCard = document.getElementById('user-card');

const linkToShare = document.getElementById('link-to-share');
const shareCard = document.getElementById('share-card');

const waitingArea = document.getElementById('waiting-area');

const chat = document.getElementById('chat-form');

// constante correspondante au élément permettant d'afficher la liste des rooms disponibles 
const roomsCard = document.querySelector('#rooms-card');
const roomsList = document.querySelector('#rooms-list');

let friendUsername = "";

sock.emit('get rooms');

sock.on('list rooms', (rooms) => {
    let html = "";

    if(rooms.length > 0){
        rooms.forEach(room => {
            if(room.players.length !== 2){
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

sock.on('join room', (roomId) => {
    player.roomId = roomId;
    linkToShare.innerHTML = `<a href="${window.location.href}?room=${player.roomId}" target="_blank">${window.location.href}?room=${player.roomId}</a>`;
});

sock.on('start chat', (players) => {
    console.log(players);
    startChat(players);
});

const writeEvent = function(text){
    let parent = document.querySelector('#chat-box');

    let newElement = document.createElement('li');
    newElement.innerHTML = text;

    parent.appendChild(newElement);
};

const onFormSubmit = function(event){
    event.preventDefault();

    let input = document.querySelector('#chat');
    let text = input.value;

    input.value = '';

    sock.emit('message', text);
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

    const friend = players.find(p => p.socketId != player.socketId);
    friendUsername = friend.username;
}

sock.on('message', writeEvent);

document.querySelector('#chat-form').addEventListener('submit', onFormSubmit);
document.querySelector('#form').addEventListener('submit', onCreateRoom);