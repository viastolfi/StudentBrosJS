import Player from './Player.js';
import ClientSocket from './ClientSocket.js'

const HIDE_ELEMENT = 'hidden-element';

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const roomId = urlParams.get('room');
export const socket = new ClientSocket();

const onCreateRoom = function (event){
    event.preventDefault();
    const form = document.querySelector('#form');
    const waitingArea = document.querySelector('#waiting-area');
    const username = document.querySelector('#username');
    let usernameValue = username.value;
    let player;

    if(roomId){
        player = new Player(false, roomId, usernameValue, socket.sock.id);
    }else{
        player = new Player(true, "", usernameValue, socket.sock.id);
    }

    socket.sendPlayerData(player)

    form.classList.add(HIDE_ELEMENT);
    waitingArea.classList.remove(HIDE_ELEMENT);
}

export function joinRoom(){
    const userNameInput = document.querySelector('#username');
    let player;
    if(userNameInput.value !== ""){
        player = new Player(false, this.dataset.room, userNameInput.value, socket.sock.id);

        socket.sendPlayerData(player);
    }

    const form = document.querySelector('#form');
    form.classList.add(HIDE_ELEMENT);
}

socket.getRoomList();
document.querySelector('#form').addEventListener('submit',onCreateRoom);