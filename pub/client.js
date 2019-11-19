//Will contain all client side code
$( document ).ready(function() {
    $("#allBooks").click(function(){
        socket.emit("getBooks");


    });

    $("#Books").click(function(){
        socket.emit("findBooks",$("#inputBooks".val()));

    });
    



    



});

var socket = io();


socket.on("setBookList", function(bookList) {
    $("#theBookList").html("");
    for(let book of bookList) {
        var tdLink = $("<td></td>").text(book.Link);

        var tr = $("<tr></tr>").append(tdLink);

        $("#theBookList").append(tr);
    }

    console.log(bookList);
});