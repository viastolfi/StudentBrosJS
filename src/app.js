const { Socket } = require('socket.io');
const express = require('express');

const app = express();
const http = require('http').createServer(app);
const clientPath =  `${__dirname}/public/`;
const port = 8080;

let roomArray = []

http.listen(port, () => {
    console.log(`Listening on http://localhost${port}`)
})

app.get('/multijoueurs', function (req, res) {
    res.sendFile(__dirname+'/public/multiplayerHomePage.html')});

const io = require('socket.io')(http);
app.use(express.static(clientPath));

module.exports = {
    io,
    roomArray,
}