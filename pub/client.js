//Will contain all client side code
var socket = io();

//function randomColor(elementName){
//}

$( document ).ready(function() {
    $("#allBooks").click(function(){
        console.log("Button clicked!");
        socket.emit("getBooks");
    });

    $("#addComm").click(function(){
        var comm = {};
        comm.Comment = $("#comment").val();
        comm.User = $("#user").val();
        socket.emit("addCom", comm);
    });

    $(".active").css('background-color',$('body').css('background-color'));

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

socket.on("currentComms", function(commList) {
    $("#comments").html("");

    for(let comm of commList) {
        var tdComment = $("<td></td>").text(comm.Comment);
        var tdUser = $("<td></td>").text(comm.User);

        var tr = $("<tr></tr>").append(tdComment).append(tdUser);

        $("#comments").append(tr);
    }

    console.log(commList);
}); 