import Player from './player.js';
import ClientSocket from './socket.js'


const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const roomId = urlParams.get('room');

let socket = new ClientSocket();

socket.getRoomList();

const onCreateRoom = function (event){
    event.preventDefault();
    const username = document.querySelector('#username').value;

    if(roomId){
        console.log(new Player(false, roomId, username, socket.id));
    }else{
        console.log(new Player(true, "", username, socket.id));
    }

}

document.querySelector('#form').addEventListener('submit',onCreateRoom);