import { joinRoom } from './multiplayerMain.js';

export default class PageBuilder{
    createPage(content){

    }

    addElement(content, parent){
        let newElement = document.createElement('p');
        newElement.textContent = content;
        parent.appendChild(newElement);
    }

    static displayRooms(roomArray){
        let html = "";
        const roomsList = document.querySelector('#rooms-list');
        const roomsCard = document.querySelector('#rooms-card');

        if(roomArray.length > 0){
            roomArray.forEach(room => {
                if(room.players.length < 4){
                    roomsCard.classList.remove('hidden-element');
                    html += `<li>
                            <p>${room.players.length}/2 - ${room.id}</p>
                            <button class="join-room" data-room="${room.id}">Rejoindre</button>
                            </li>`;
                }
            });
        }
        roomsList.innerHTML = html;
        for(const element of document.getElementsByClassName('join-room')){
            element.addEventListener('click', joinRoom, false);
        }
    }

    static CreateGame(){
        let el = document.querySelector('.connection-element');
        let game = document.querySelector('.game-container');
        let waitingScreen = document.getElementById('match-making');
        el.remove();
        game.style.display = 'block';
        waitingScreen.style.display = 'none';
    }
}
