//Will contain all client side code
$( document ).ready(function() {
    $("#Books").click(function(){
        socket.emit("getBooks");

    });



    



});

var socket = io();
