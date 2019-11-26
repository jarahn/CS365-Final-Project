//The server was created with heavy reference to the mongodb book application designed in class

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

//Send the entire db of books to the client
function sendAllBooksToClient(theSocket) {
	db.collection("Book List").find({}, {sort: [['Author', 1]]}).toArray(function(error, documents) {
		if (error != null) {
			console.log(error);
		}
		else {
			theSocket.emit("setBookList", documents);
		}
	});
}

//Load the current database of comments for each user connection
function getComments(){
	dbc.collection("User Comments").find({}).toArray(function(error, documents){
		if (error != null)
			console.log(error);
		else {
			io.emit("currentComms", documents);
		}
	});
}

//Find the books whose keywords contain the substring that was searched for (using the built in mongodb regex search)
function sendSearchToClient(theSocket, search) {
	search = search.toUpperCase();
	db.collection("Book List").find({Keywords: {$regex: search}}, {sort: [['Author', 1]]}).toArray(function(error, documents) {
		if (error != null) {
			console.log(error);
		}
		else {
			theSocket.emit("setBookList", documents);
		}
	});
}

function validateComment(objectToValidate, schema) {
	//nonemptyString, positiveInteger
	for(prop in objectToValidate) {
		if (schema[prop] === "nonemptyString") {
			if (!(typeof objectToValidate[prop] === "string" && objectToValidate[prop].length > 0)) {
				return false;
			}
		}
		else {
			return false;
		}
	}
	
	return true;
}



io.on("connection", function(socket) {
	console.log("Somebody connected.");
	getComments();

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

	socket.on("addCom", function(newComment) {
		var validated = validateComment(newComment, {Comment: "nonemptyString", User: "nonemptyString"});
		if (validated) {
			dbc.collection("User Comments").insertOne(newComment, getComments);
		}
	});

});


client.connect(function(err) {
	if (err != null) throw err; //No DB connection?  Then force our server to crash with an error.
	else {
		//Get our books and comments databases
		db = client.db("Books"); 
		dbc = client.db("Comments");

		//Start listening for client connections
		server.listen(80, function() {
			console.log("Server with socket.io is ready.");
		});
	}
});