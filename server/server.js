var express = require('express');
var path = require('path');
var app = express();

var server = require('http').createServer(app);
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



class toto {

	constructor(x){

	}


}
///////////////////////////////static files server ////////////////////////////////////

var appsDir = path.join(__dirname, '..', "client");

app.get('/', function(req, res) {
	res.sendFile(appsDir + "/index.html");
});


app.get('/index.html', function(req, res) {
	res.sendFile(appsDir + "/index.html");
});
app.get('/page.html', function(req, res) {
	res.sendFile(appsDir + "/page.html");
});


app.use("/img/", function(req, res, next) {
	res.sendFile(appsDir + req.client._httpMessage.req.originalUrl);
});

app.use("/bower_components/", function(req, res, next) {
	res.sendFile(appsDir + req.client._httpMessage.req.originalUrl);
});

//this must be done into photo services.
app.use("/server/img/photos/", function(req, res, next) {
		res.sendFile(appsDir + req.client._httpMessage.req.originalUrl);
});

app.use(function(req, res, next) {
	res.setHeader('Content-Type', 'text/plain');
	console.log("not founcd " + req.client._httpMessage.req.originalUrl);
	res.sendStatus(404);
});
