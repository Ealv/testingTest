var _ = require('underscore');

var dbDir = __dirname + "/img/photos/";
var urlPath = "http://localhost:8000/server/img/photos/";
var urlPathTHumbs = "http://localhost:8000/server/img/photos/";

//the api for our photo service
// see exports.actions for xeposed methods at the end of file
// see test/services/photo.js for testing the api.

/**
 * Gets all photos. Can be filtered by an optional $ingredient.
 *
 * @param ?ingredient int ingredient ID (to be defined)
 * @return json {response:{}, status:200}
 */

var getPhotos = function(req, res) {
	res.setHeader('Content-Type', 'application/json');
	var walk = require('walk');
	var files = [];

	// Walker options
	console.log("looking " + dbDir);
	var walker = walk.walk(dbDir, {
		followLinks: false
	});

	walker.on('file', function(root, stat, next) {
		//console.log(file );
		files.push({
			id: encodeURI(stat.name),
			url: urlPathTHumbs + encodeURI(stat.name),
			text: stat.name
		});
		next();

	});
	walker.on('end', function() {
		res.status(200).send(files);
	});
};

/**
 * Gets the photo corresponding to the given $id
 *
 * @param :id int photo ID
 * @return json {response:{}, status:200|404}
 */
var getPhoto = function(req, res) {
	res.setHeader('Content-Type', 'application/json');
	var id = req.params.id;

	var fs = require("fs");
	var fileExist = fs.exists(dbDir + id, function(exist) {
		if (exist)
			res.status(200).json({
				id: encodeURI(id),
				url: urlPath + encodeURI(id),
				text: 'blblba  for  ' + encodeURI(id)
			});
		else {
			res.status(404).end();
		}
	});
};

/**
 * Updates a given photo (TODO)
 *
 * @param :id int photo ID
 * @return json {response:{}, status:204|404}
 */
var addPhoto = function(req, res) {
	res.setHeader('Content-Type', 'application/json');
	var idPhoto = req.params.id;
	res.status(204).json({});
};

/**
 * Updates a given photo (TODO)
 *
 * @param :id int photo ID
 * @return json {response:{}, status:204|404}
 */
var createPhoto = function(req, res) {
	res.setHeader('Content-Type', 'application/json');
	switch (req.params.id) {
		case '1':
		case '2':
		case '3':
			res.status(204).json({});
			break;
		default:
			res.status(404).json({});
	}
};

/**
 * Updates a given photo (TODO)
 *
 * @param :id int photo ID
 * @return json {response:{}, status:204|404}
 */
var updatePhoto = function(req, res) {
	res.setHeader('Content-Type', 'application/json');
	var idPhoto = req.params.id;
	res.status(204);
};

/**
 * Deletes the given ingredient (to be defined)
 *
 * @param :id int ingredient ID
 * @return json {response:{}, status:204|404}
 */
var deletePhoto = function(req, res) {
	res.setHeader('Content-Type', 'application/json');
	var id = req.params.id;

	var fs = require("fs");
	var fileExist = fs.exists(dbDir + id, function(exist) {
		if (exist)
			res.status(200).json({
				id: encodeURI(id),
				url: dbDir + encodeURI(id),
				text: 'blblba  for  ' + encodeURI(id)
			});
		else {
			res.status(404).end();
		}
	});
};

//exposed methods for exports
exports.actions = {
	"getPhotos": getPhotos,
	"getPhoto": getPhoto,
	"addPhoto": addPhoto,
	"updatePhoto": updatePhoto,
	"deletePhoto": deletePhoto
};
