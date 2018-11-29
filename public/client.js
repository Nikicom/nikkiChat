var socket = io.connect('https://enigmatic-reef-74873.herokuapp.com/');

var message = document.getElementById('message');
username = document.getElementById('username');
output = document.getElementById('output');
feedback = document.getElementById('feedback');
userCount = document.getElementById('userCount');
fieldErr = document.getElementById('fieldErr');
btn = document.getElementById('send');


btn.addEventListener('click', () => {
let timenow = new Date();
let stringTime = timenow.toLocaleTimeString();

    socket.emit('chat', {
        username: username.value,
        message: message.value,
        time: stringTime
    });
});

message.addEventListener('keypress', () => {
    socket.emit('typing', username.value);
});

socket.on('chat', (data) => {
    feedback.innerHTML = '';
    output.innerHTML += '<p><strong>' + data.username + ': </strong>' + data.message
        + '</p>'
        time.innerHTML += '<p><strong>' + data.time +'</strong></p>'
});

socket.on('typing', (data) => {
    feedback.innerHTML = '<p>' + data + ' is typing a message ...'
        + '</p>'
});

socket.on('userCount', (data) => {
    userCount.innerHTML = '<p><strong>' + data.user + ' user(s) online now'
        + '</strong></p>'
});

socket.on('exception', (data) => {
    fieldErr.innerHTML = '<p><strong>' + data.fieldErr + '</strong></p>'
});k