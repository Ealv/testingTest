var express = require('express');
var path = require('path');
var app = express();

var server = require('http').createServer(app);
//server is listening on localhost:8000/
server.listen(8000);

///////////////////////////////service server ////////////////////////////////////
var services = require('./services');
app.route('/services/photos/:id')
	.get(function(req, res) {
		services.actions.getPhoto(req, res);
		//res.send('Get a random book');
	})
	.post(function(req, res) {
		services.actions.addPhoto(req, res);
	})
	.put(function(req, res) {
		services.actions.updatePhoto(req, res);
	}).delete(function(req, res) {
		services.actions.deletePhoto(req, res);
	});

app.route('/services/photos/')
	.get(function(req, res) {
		services.actions.getPhotos(req, res);
	});


////////////////////////login process //////////////////////////////////////////
app.route('/login').get(function(req, res) {
		var query = req.query;
		//res.send('try to login process');
		if(query.user_name === "zombie" && query.password === "do-you-need-brain?")
			res.redirect('client/app.html');
		else
			res.redirect('/');
	});

///////////////////////////////static files server ////////////////////////////////////
var appsDir = path.join(__dirname, '..');

app.get('/', function(req, res) {
	res.sendFile(appsDir + "/client/login.html");
});

//whatever webrowser is asking with "localhost:8000/client"  ... send it !
app.use("/client/", function(req, res, next) {
	res.sendFile(appsDir + req.client._httpMessage.req.originalUrl);
});

app.use("/bower_components/", function(req, res, next) {
	res.sendFile(appsDir + req.client._httpMessage.req.originalUrl);
});

app.use("/css/", function(req, res, next) {
	res.sendFile(appsDir + req.client._httpMessage.req.originalUrl);
});

app.use("/fonts", function(req, res, next) {
	res.sendFile(path.join(appsDir, "bower_components/bootstrap", decodeURI(req.client._httpMessage.req.originalUrl)));
});

app.use(function(req, res, next) {
	res.setHeader('Content-Type', 'text/plain');
	console.log("not founcd " + req.client._httpMessage.req.originalUrl);
	console.log("appp name  " + appsDir);
	res.sendStatus(404);
});

//export server as server;