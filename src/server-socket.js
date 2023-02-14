const { io } = require(`${__dirname}/app.js`);
const { roomArray } = require(`${__dirname}/app.js`);

// le socket s'ouvre lors de la connection d'un client
io.on('connection', (socket) => {
    // la console du serveur est visible dans le terminal ou vous avez lancer le serveur
    console.log('New person connected');

    // lorsqu'un socket portant le nom 'hello' est reçu fait l'action suivante
    socket.on('hello', (callback) => {
        // renvoie la réponse au socket directement (en JSON)
        callback({
            message : "World"
        });
    });

    socket.on('get rooms', () => {
        io.to(socket.id).emit('list room', roomArray);
    })
});