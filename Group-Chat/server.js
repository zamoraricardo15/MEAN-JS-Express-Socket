var express = require('express');
var app = express();



var server = app.listen(8000);
var io = require('socket.io')(server);

var chatLog = [];



app.use(express.static(__dirname + '/static'));

app.set('views', __dirname + '/views');

app.set('view engine', 'ejs');

io.on("connection",function(socket){


	var name="";


    socket.emit("initial",{chat:chatLog});

    socket.on("set-name",function(person){

		name = person.name;
        console.log("name");
    });


	socket.on("send",function(message){

		chatLog.push(`${name}: ${message.msg}`);
        socket.emit("user-log",{chat:chatLog});

		socket.broadcast.emit("global-log",{chat:chatLog});
        console.log(message.msg);
        console.log(chatLog);

	})

});
 
app.get('/', function(request, response) {

	response.render('index');

});