import Player from './player.js';
import ClientSocket from './clientSocket.js'

const HIDE_ELEMENT = 'hidden-element';

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const roomId = urlParams.get('room');
let socket = new ClientSocket();

socket.getRoomList();

const onCreateRoom = function (event){
    event.preventDefault();
    const form = document.querySelector('#form');
    const waitingArea = document.querySelector('#waiting-area');
    const username = document.querySelector('#username');
    let usernameValue = username.value;
    let player;

    if(roomId){
        player = new Player(false, roomId, usernameValue, socket.id);
    }else{
        player = new Player(true, "", usernameValue, socket.id);
    }

    socket.sendPlayerData(player)
    
    form.classList.add(HIDE_ELEMENT);
    waitingArea.classList.remove(HIDE_ELEMENT);
}

document.querySelector('#form').addEventListener('submit',onCreateRoom);