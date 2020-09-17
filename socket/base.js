module.exports = function (io) {
    //Socket.IO
    io.on('connection', function (socket) {
        console.log('Connected');
        socket.join('test').emit('Hello')
        socket.emit('EventTest',  'Hello 2')

        //ON Events
        socket.on('admin', function (data) {
            console.log('Successful Socket Test');
            console.dir(data)
        });

        //End ON Events
    });
};
