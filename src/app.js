const { Socket } = require('socket.io');
const express = require('express');
const path = require('path');

const app = express();
const http = require('http').createServer(app);
const port = 8080;

const containerDirname = __dirname+"/containers/StudentBrosJS-studentbrosjs/"

let roomArray = []

http.listen(port, () => {
    console.log(`Listening on http://localhost${port}`)
})

const io = require('socket.io')(http);
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(containerDirname, 'public/index.html'))
});

app.get('/multiplayerHomePage', (req, res) => {
    res.sendFile(path.join(containerDirname, 'public/multiplayerHomePage.html'))
});

module.exports = {
    io,
    roomArray,
}