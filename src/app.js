const { Socket } = require('socket.io');
const express = require('express');

const app = express();
const http = require('http').createServer(app);
const path = require('path');
const port = 8080;

app.use(express.static('public'));

let roomArray = []

http.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`)
})


const io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/game', (req, res) => {
	res.sendFile(path.join(__dirname, '/public/game.html'));
})

app.all('/multijoueurs', function(req, res) {
    res.sendFile(__dirname+'/public/multiplayerHomePage.html');
});
	
module.exports = {
    io,
    roomArray,
}


app.all('/multijoueurs', function (req, res) {
    res.sendFile(__dirname+'/public/multiplayerHomePage.html')
});
