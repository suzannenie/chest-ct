'use strict';

var socket = io.connect();
var userID;
var imgName;
var answer;

socket.on('connect', function() {
    console.log("connected")
});

socket.on('new_image', function(img_filename) {
    imgName = img_filename;
    console.log('newimage ' + imgName);
    document.getElementById("img_filename").innerHTML = img_filename;
    document.getElementById("img").innerHTML = '<img src="../static/' + img_filename + '" alt="no image">';
});

function submitAnswer() {
    answer = document.getElementById("label").value;
    console.log("answer " + answer);
    socket.emit('submit_answer', answer);
}