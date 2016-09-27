var socketio = require('socket.io');
var io = socketio.listen(process.env.PORT || 80);

io.sockets.on('connection', function (socket) {
    socket.emit('connection', function (data) {
        type: 'connected'
    });
    
    socket.on('connection', function (data) {
        if (data.type == 'join') {
            socket.join(data.room);
            socket.set('room', data.room);
            socket.emit('system', {
                message: 'Welcome to chat'
            });
            socket.broadcast.to(data.room).emit('system', {
                message: data.name + ' entered'
            });
        }
    });
    socket.on('user', function (data) {
        socket.get('room', function (error, room) {
            socket.broadcast.to(room).emit('message', data);
        });
    });
});
