let button = document.getElementById('say');

let writeEvent = (text) => {
    let parent = document.querySelector('#events');
    
    let el = document.createElement('li');
    el.innerHTML = text;

    parent.appendChild(el);
};

let onFormSummit = (e) => {
    e.preventDefault();

    let input = document.querySelector('#chat');
    let text = input.value;

    input.value = '';

    sock.emit('message', text);
};

writeEvent('Welcome to RPS');

const sock = io();
sock.on('message', writeEvent);

document.querySelector('#chat-form').addEventListener('submit', onFormSummit);