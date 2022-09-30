'use strict';

// const cors = require('cors')
// const express = require('express')
// const app = express()
// const server = require('http').createServer(app);
// const http = require("http");
// app.use(cors());

// const io = require("socket.io")(server, {
//     allowEIO3: true,
//     cors: {
//         origin: true,
//         credentials: true,
//     },
// });

var socket = io.connect();
var userID;

socket.on('connect', function() {
    console.log("connected")
});

function clickedButton() {
    userID = "student";
    socket.emit('user_clicked', userID);
}