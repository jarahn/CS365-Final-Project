//Will contain all client side code
var socket = io();

$( document ).ready(function() {
    $("#allBooks").click(function(){
        console.log("Button clicked!");
        socket.emit("getBooks");


    });

    $("#Books").click(function(){
        var info = $("#bookInput").val();
        socket.emit("findBooks",info);


    });
    
    
    



});


socket.on("setBookList", function(bookList) {
    $("#theBookList").html("");
    for(let book of bookList) {
        var tdLink = $("<td></td>").text(book.Link);
        var tdA = $("<a></a>").text(tdLink);

        var tr = $("<tr></tr>").append(tdA);

        $("#theBookList").append(tr);
    }

    console.log(bookList);
});