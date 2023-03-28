import { socket } from './main.js';
import Game from './Game.js'

const HIDE_ELEMENT = 'hidden-element';

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const roomId = urlParams.get('room');

export let game = new Game(socket);

let i = '';
let interval = setInterval(() => {
	document.getElementById('searching-for-match').innerHTML =
		'Searching for Match' + i;
	i += '.';
	if (i == '.....') i = '';
}, 500);

const onCreateRoom = function (event){
    event.preventDefault();
    const username = document.querySelector('#username');
    let usernameValue = username.value;

    socket.sendPlayerData(usernameValue);

    document.getElementById('user-card').remove();
    document.getElementById('match-making').style.display = 'block';
}

export function joinRoom(){
    const userNameInput = document.querySelector('#username');
    const roomId = document.querySelector('.join-room');
    if(userNameInput.value !== ""){
        socket.sendPlayerData(userNameInput.value, roomId.dataset.room);
    }
}

socket.getRoomList();
document.querySelector('#form').addEventListener('submit',onCreateRoom);