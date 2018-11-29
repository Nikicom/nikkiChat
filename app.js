
//create server using express

const express = require('express');
const socketIo = require('socket.io');

// Create express server
const app = express();
var port = process.env.PORT || 5000;

app.use(express.static('public'));

// Start server and listen on a port
var server = app.listen(port, () => {
    console.log(`Server started on ${port}`);
});
//use server on port 5000 for socketIO connection
const io = socketIo(server);

/* var connection = [] */
let userCount=0;
let errmsg= 'Please enter your username/message!';

io.on('connection',(socket)=>{
    userCount++;
    io.sockets.emit('userCount',{
        user: userCount
    });
    /* connection.push(socket) */
    /* console.log(`${connection.length} user(s) connected`) */

    socket.on ('disconnect',()=>{
        userCount--;
        io.sockets.emit('userCount',{
            user: userCount
        });
        /* connection.splice(connection.indexOf(socket),1) */
        /* console.log(`${connection.length} user(s) remaining`) */
    })

    socket.on('chat',(data)=>{

        if (data.username==''|| data.message==''){
        io.sockets.emit('exception', {fieldErr: errmsg})
        }else{
        io.sockets.emit('chat', data)}
    })

    socket.on('typing',(data)=>{
        socket.broadcast.emit('typing', data)
    })
});