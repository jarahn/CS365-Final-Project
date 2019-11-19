//Will contain all client side code
$( document ).ready(function() {
    $("#Books").click(function(){
        socket.emit("getBooks");

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