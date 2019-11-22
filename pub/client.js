//Will contain all client side code
var socket = io();

function randomColor(elementName){
    


}

$( document ).ready(function() {
    $("#allBooks").click(function(){
        console.log("Button clicked!");
        socket.emit("getBooks");
    });


    $("#Books").click(function(){
        var info = $("#bookInput").val();
        socket.emit("findBooks",info);


    });


    $("#colorChanger").click(function(){
        var R = Math.floor((Math.random() * 256));
        var G = Math.floor((Math.random() * 256));
        var B = Math.floor((Math.random() * 256));
        console.log("t");
        $('#jqueryPage').css('background-color','rgb('+R +','+G+','+B+')');
    });


    
});

//How do we put a hyperlink in the <td>?
socket.on("setBookList", function(bookList) {
    $("#theBookList").html("");
    for(let book of bookList) {
        var tdLink = $("<td></td>").text(book.Link);
        var s = '<td><a href="'+book.Link+'">'+book.Title+'</a></td>';
        s = $(s);
        var tdTitle = $("<td></td>").append(s);
        var tdAuthor = $("<td></td>").text(book.Author);

        var tr = $("<tr></tr>").append(tdTitle).append(tdAuthor);

        $("#theBookList").append(tr);
    }

    console.log(bookList);
}); 