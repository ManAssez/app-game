const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
let connectedUsers = [];
// Définissez le répertoire statique pour servir les fichiers clients (HTML, CSS, JS).
app.use(express.static(__dirname + '/public'));

// Créez une route pour servir votre page HTML.
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Configurez la connexion Socket.io.
io.on('connection', (socket) => {
  console.log('Nouvelle connexion socket établie');

  // Gérez les événements de communication avec les clients.
  socket.on('message', (data) => {
    console.log('Message reçu :', data);

    // Diffusez le message à tous les clients connectés.
    io.emit('message', data);
  });

  socket.on('join', (data) => {
    console.log('Message reçu :', data);
    const exist = connectedUsers.find(e => e.name === data.name);
    socket.join(data.name)
    if (exist) {
        socket.emit('exist', data);
    }else {
        connectedUsers.push({
            name: data.name,
            score: 0
        })
        io.emit('joined_other', connectedUsers);
        socket.emit('joined', data.name);
    }
    // Diffusez le message à tous les clients connectés.
  });

  socket.on('data', (data, callback) => {
    callback(connectedUsers)
  });

  socket.on('anwser', (data) => {
    io.emit('answered', data)
  });

  socket.on('remove', (data) => {
    connectedUsers = connectedUsers.filter(e => e.name !== data)
    socket.to(data).emit('removed')
  });
  // Gérez la déconnexion d'un client.
  socket.on('disconnect', () => {
    console.log('Client déconnecté');
  });
});

// Lancez le serveur sur le port 23000.
const PORT = process.env.PORT || 23000;
server.listen(PORT, () => {
  console.log(`Serveur Express en cours d'exécution sur le port ${PORT}`);
});
