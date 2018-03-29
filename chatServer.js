var app = require('http').createServer(handler)
    , io = require('socket.io').listen(app)
    , fs = require('fs');
app.listen(8001);
function handler(req, res) {
    fs.readFile(__dirname + '/chat.html', function (err, data) {
        if (err) {
            res.writeHead(500);
            return res.end('Error in load chat.html');
        }
        res.writeHead(200);
        res.end(data);
    });
}
io.sockets.on('connection', function (socket) {

   

    socket.on("chooseTheRoom", function (roomNumber) {
        socket.roomNumber = roomNumber;
        //Try to comment and console.log for events, it can help u understand what happened
        //Like this: console.log(socket.roomNumber);
        socket.emit("chat", "SERVER", "You are in the " + roomNumber);
        /* 以上: 此處不建議回傳訊息，後端純粹傳資料就好，也就是只要傳roomNumber即可。
           通常只有錯誤發生，才會回傳錯誤訊息 */
        socket.join(roomNumber);
    });

    socket.on('addcustomer', function (username, roomNumber) {
        //That's strange, the 'addcustomer' evenet from Front-End
        //only pass one parameter, but u have two. 
        //Try This, and u will discover the error: console.log(roomNumber);
        socket.username = username;
        socket.emit('chat', 'SERVER', 'You have connected seccussfully');
        socket.broadcast.in(roomNumber).emit("chat", "SERVER", username + "is onloine")
        //socket.broadcast.emit('chat' , 'SERVER' , username + ' is on line');
    });
    socket.on('sendchat', function (data, roomNumber) {
        io.sockets.in(roomNumber).emit("chat", socket.username, data);
        //io.sockets.emit('chat' , socket.username , data);
    });
    socket.on('disconnect', function (roomNumber) {
        socket.broadcast.in(roomNumber).emit("chat", "SERVER", socket.username + "has left the room");
        //io.sockets.emit('chat' , 'SERVER' , socket.username + ' has left the chat')
    });
});
