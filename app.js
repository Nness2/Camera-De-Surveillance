var http = require('http');
var fs = require('fs');

// Chargement du fichier index.html affich� au client
var server = http.createServer(function(req, res) {
    fs.readFile('./index.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});

// Chargement de socket.io
var io = require('socket.io').listen(server);

// Quand un client se connecte, on le note dans la console
io.sockets.on('connection', function (socket) {
    console.log('Un client est connect� !');
	socket.on('name', function(name) {
        socket.name = name;
		console.log(name);
    });
	
	socket.on('frame', function(imageToSend) {
		console.log(imageToSend);
    });
	
	socket.on('test', function(test) {
        socket.emit('alarm', '');
    });
});


server.listen(8080);