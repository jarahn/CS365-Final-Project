//Will contain all client side code
var socket = io();

$( document ).ready(function() {
    $("#allBooks").click(function(){
        console.log("Button clicked!");
        socket.emit("getBooks");
    });
    

});


socket.on("setBookList", function(bookList) {
    $("#theBookList").html("");
    for(let book of bookList) {
        var tdLink = $("<td></td>").text(book.Link);

        var tr = $("<tr></tr>").append(tdLink);

        $("#theBookList").append(tr);
    }

    console.log(bookList);
});