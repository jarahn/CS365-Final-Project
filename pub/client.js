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

    $("#jqueryPage").css("background-color","red");


    $("#colorChanger").click(function(){
        var R = Math.floor((Math.random() * 256));
        var G = Math.floor((Math.random() * 256));
        var B = Math.floor((Math.random() * 256));
        $("#jqueryPage").css("background-color","red");

        

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