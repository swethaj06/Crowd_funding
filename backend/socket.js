const { Server } = require('socket.io');

let io;
function init(server) {
  io = new Server(server, { cors: { origin: '*' } });
  io.on('connection', (socket) => {
    socket.on('donation', (data) => {
      io.emit('donation', data);
    });
    socket.on('heart', (data) => {
      io.emit('heart', data);
    });
  });
}
module.exports = { init, io };
