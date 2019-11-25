'use strict';
var http = require('http');
var fs = require('fs');

// Chargement du fichier index.html affiché au client
var server = http.createServer(function(req, res) {
    fs.readFile('./index.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});

// Chargement de socket.io
var io = require('socket.io').listen(server);
//var reader  = new FileReader();
// Quand un client se connecte, on le note dans la console
io.sockets.on('connection', function (socket) {
    console.log('Un client est connecté !');
	socket.on('name', function(name) {
        socket.name = name;
		console.log(name);
    });
	
	socket.on('mFrame', function(mFrame) {
		console.log(mFrame);
    });
	
	socket.on('test', function(test) {
        socket.emit('mouvement', '');
    });
	
	socket.on('stream', function(stream) {
		//reader.readAsDataURL(stream);
		//console.log(reader.result);
        //var fileBuffer = new Buffer(stream, 'base64');
		//fs.writeFileSync("fileName", fileBuffer);
		//console.log(fileBuffer);
		//fs.writeFileSync(fileName, fileBuffer);
    });
});


server.listen(8080);