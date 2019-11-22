
//Stuff for MongoDB
var mongodb = require("mongodb");
var MongoClient = mongodb.MongoClient;
var client = new MongoClient("mongodb://localhost:27017", { useNewUrlParser: true, useUnifiedTopology: true });
var db;

//Stuff for express, server, and socket.io
var express = require("express");
var app = express();
var http = require("http");
var server = http.Server(app);
var socketio = require("socket.io");
var io = socketio(server);
app.use(express.static("pub"));


function sendAllBooksToClient(theSocket) {
	db.collection("Book List").find({}, {sort: [['Link', 1]]}).toArray(function(error, documents) {
		if (error != null) {
			console.log(error);
		}
		else {
			theSocket.emit("setBookList", documents);
		}
	});
}


function sendSearchToClient(theSocket, search) {
	db.collection("Book List").find({Keywords: search}, {sort: [['Author', 1]]}).toArray(function(error, documents) {
		if (error != null) {
			console.log(error);
		}
		else {
			theSocket.emit("setBookList", documents);
		}
	});
}



io.on("connection", function(socket) {
	console.log("Somebody connected.");

	socket.on("disconnect", function() {
		//This particular socket connection was terminated (probably the client went to a different page or closed their browser).
		console.log("Somebody disconnected.");
	});

	socket.on("getBooks", function() {
		console.log("Got call to getBooks");
		// talk to the database and get the list of books, send it back to the client.
		sendAllBooksToClient(socket);
	});

	socket.on("findBooks", function(searchTerms) {
		console.log("Got call to search for specific books (findBooks)");
		//Search the DB for those keywords
		sendSearchToClient(socket, searchTerms);

	});

});


client.connect(function(err) {
	if (err != null) throw err; //No DB connection?  Then let our server crash with an error.
	else {
		db = client.db("Books"); //Get our specific database

		//Start listening for client connections
		server.listen(80, function() {
			console.log("Server with socket.io is ready.");
		});
	}
});