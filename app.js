const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('New client connected');

  // Send the current time to the client
  socket.emit('time', getCurrentTime());

  // Update the time every second
  setInterval(() => {
    socket.emit('time', getCurrentTime());
  }, 1000);
});

server.listen(3000, () => {
  console.log('Server started on port 3000');
});

function getCurrentTime() {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return `${hours}:${minutes}:${seconds}`;
}