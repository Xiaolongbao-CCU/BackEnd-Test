var app = require('http').createServer(handler)
 , io = require('socket.io').listen(app)
 , fs = require('fs');
 app.listen(8001);
 function handler(req , res)
 {
    fs.readFile(__dirname + '/chat.html' , function(err , data)
{
    if(err)
    {
        res.writeHead(500);
        return res.end('Error in load chat.html');
    }
    res.writeHead(200);
    res.end(data);
});
}
io.sockets.on('connection' , function(socket)
{
    socket.on("chooseTheRoom" , function(roomNumber)
{
    socket.roomNumber = roomNumber;
    socket.emit("chat" , "SERVER" , "You are in the " + roomNumber);
    socket.join(roomNumber);
});
    socket.on('addcustomer' , function(username , roomNumber)
{
    socket.username = username;
    socket.emit('chat' , 'SERVER' , 'You have connected seccussfully');
    socket.broadcast.in(roomNumber).emit("chat" , "SERVER" , username + "is onloine")
    //socket.broadcast.emit('chat' , 'SERVER' , username + ' is on line');
});
    socket.on('sendchat' , function(data , roomNumber)
{
    io.sockets.in(roomNumber).emit("chat" , socket.username , data);
    //io.sockets.emit('chat' , socket.username , data);
});
    socket.on('disconnect' , function(roomNumber)
{
    socket.broadcast.in(roomNumber).emit("chat" , "SERVER" , socket.username + "has left the room");
    //io.sockets.emit('chat' , 'SERVER' , socket.username + ' has left the chat')
});
});
