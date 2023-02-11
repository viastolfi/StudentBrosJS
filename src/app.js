const { Socket } = require('socket.io');
const express = require('express');

const app = express();
const http = require('http').createServer(app);
const clientPath =  `${__dirname}/public/`;
const port = 8080;

http.listen(port, () => {
    console.log(`Listening on http://localhost${port}`)
})

const io = require('socket.io')(http);
app.use(express.static(clientPath));

module.exports = {
    io,
}