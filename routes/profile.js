var mysql = require('./mysql');

var mongo = require("./mongo");
var mongodb = require('mongodb');
var database = "mongodb://localhost:27017/airbnb";
var fs = require('fs');

var uuid = require('node-uuid');

//sreekar
var winston=require('winston');
var logger = new (winston.Logger)({
	  transports: [
	    new (winston.transports.Console)(),
	    new (winston.transports.File)({ filename: './Logs' +
	    '/userTracking.log'
	    })
	 ]
})


exports.getProfilePage = function(req, res) {
	 if(req.session.user_id){
	console.log(req.session.user_id);
	res
			.header(
					'Cache-Control',
					'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');

	res.render('profile', {
		title : 'Express'
	});
	logger.info('user landed on profile page',{userid:req.session.user_id});
}
else{
	res.render('landing');
}
};

exports.getDashboard = function(req, res) {
	 if(req.session.user_id){
	console.log("here");
	res
			.header(
					'Cache-Control',
					'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');

	res.render('dashboard', {
		title : 'Express'
	});
	logger.info('user landed on dashboard',{userid:req.session.user_id});
		}
		else{
			res.render('landing');
		}
};


exports.getProfile = function(req, res) {

	var user_id = req.session.user_id;

	// var getProfile = "select * from user_profile where user_id=" + user_id;
	var getProfile = "select t1.*,t2.email from  user_profile t1, user_auth t2 where t1.user_id= t2.user_id and t1.user_id ="
			+ user_id;
	// console.log("Query is:" + getUser);
	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
			var json_responses = {
				"statusCode" : "400"
			};
			res.send(json_responses);
		} else {
			if (results.length > 0) {
				var profile = results[0];
				console.log(results[0]);
				console.log("profile");

				var json_responses = {
					"statusCode" : "200",
					"profile" : profile
				};
				res.send(json_responses);

			} else {

				json_responses = {
					"statusCode" : "400"
				};
				res.send(json_responses);

			}

		}
	}, getProfile);
};

exports.updateProf = function(req, res) {
	console.log("update prof");
	console.log(req.param("updates"));
	var updates = req.param("updates");
	var updateProf = "update user_profile set ";
	if (updates.hasOwnProperty('fname')) {
		updateProf = updateProf + "fname = '" + updates.fname + "',"
	}
	if (updates.hasOwnProperty('lname')) {
		updateProf = updateProf + "lname = '" + updates.lname + "',"
	}

	if (updates.hasOwnProperty('phone_no')) {
		updateProf = updateProf + "phone_no = '" + updates.phone_no + "',"
	}
	if (updates.hasOwnProperty('birthday')) {
		updateProf = updateProf + "birthday = '" + updates.birthday + "',"
	}
	if (updates.hasOwnProperty('street')) {
		updateProf = updateProf + "street = '" + updates.street + "',"
	}
	if (updates.hasOwnProperty('apartment')) {
		updateProf = updateProf + "apartment = '" + updates.apartment + "',"
	}
	if (updates.hasOwnProperty('city')) {
		updateProf = updateProf + "city = '" + updates.city + "',"
	}
	if (updates.hasOwnProperty('state')) {
		updateProf = updateProf + "state = '" + updates.state + "',"
	}
	if (updates.hasOwnProperty('zip_code')) {
		updateProf = updateProf + "zip_code = '" + updates.zip_code + "',"
	}
	updateProf = updateProf + "user_id=" + req.session.user_id
			+ " where user_id = " + req.session.user_id;
	console.log(updateProf);

	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
			var json_responses = {
				"statusCode" : "400"
			};
			res.send(json_responses);
		} else {
			if (updates.hasOwnProperty('email')) {

				var updateEmail = "update user_auth set email = '"
						+ updates.email + "' where user_id = "
						+ req.session.user_id;
				mysql.fetchData(function(err, results) {
					if (err) {
						throw err;
						var json_responses = {
							"statusCode" : "400"
						};
						res.send(json_responses);
					} else {

						var json_responses = {
							"statusCode" : "200"
						};

					}
				}, updateEmail);
				logger.info('user landed on update profile page',{userid:req.session.user_id});
			}

			var json_responses = {
				"statusCode" : "200"
			};
			res.send(json_responses);

		}
	}, updateProf);
};

exports.updatePhoto = function(req, res) {
	logger.info('user updated his photo',{userid:req.session.user_id});
	var puidData = {};
	var postData = {};
	var imageID = uuid.v4() + ".png";
	puidData.images = [];
	puidData.images.push(imageID);
	puidData.videos = "";
	postData.puid = req.session.user_id;
	postData[req.session.user_id] = puidData;

	mongo.connect(database, function(connection) {
		var userCollection = mongo.connectToCollection('user', connection);

		userCollection.update({
			"puid" : req.session.user_id
		}, {
			$set : postData
		}, {
			upsert : true
		}, function(error, result) {
			console.log(result);
			mongodb.MongoClient.connect(database, function(error, db) {
				var bucket = new mongodb.GridFSBucket(db, {
					chunkSizeBytes : 1024,
					bucketName : 'images'
				});
				fs.createReadStream(req.files.image.path).pipe(
						bucket.openUploadStream(imageID)).on(
						'error',
						function(error) {
							if (error) {
								res.send({
									"statusCode" : 500,
									"errmsg" : "Error: Cannot upload image: "
											+ error
								});
							}
						}).on('finish', function() {
					console.log('done!');
					res.send({
						"statusCode" : 200
					});
				});
			});
		});
	});

};

exports.getImageUrl = function(req, res) {
	mongo.connect(database, function(connection) {
		console.log("reached getImageUrl");
		var userCollection = mongo.connectToCollection('user', connection);

		userCollection.findOne({
			"puid" : req.session.user_id
		}, function(error, result) {
			console.log("after mongo req getImageUrl");
			if (!error && result != null) {
				console.log(result);
				var imageUrl = result[req.session.user_id].images[0];
				console.log(imageUrl);

				res.send({
					"statusCode" : 200,
					"url" : imageUrl
				});
			}

		});

	});
};

exports.getHostImageUrl = function(req, res) {

	var user_id = req.param("user_id");
	mongo.connect(database, function(connection) {
		var userCollection = mongo.connectToCollection('user', connection);

		userCollection.findOne({
			"puid" : user_id
		}, function(error, result) {

			if (!error && result != null) {
				console.log(result);
				var imageUrl = result[user_id].images[0];
				console.log(imageUrl);

				res.send({
					"statusCode" : 200,
					"url" : imageUrl
				});
			}

		});

	});
};

exports.getImageByUrl = function(req, res) {
	try {
		var fileName = req.query.profile_pic;
		console.log(fileName);
		console.log("imagecoll");
		res.setHeader('Content-type', 'image/png');
		mongodb.MongoClient.connect(database, function(error, db) {
			console.log("imagecoll2");
			var bucket = new mongodb.GridFSBucket(db, {
				chunkSizeBytes : 1024,
				bucketName : 'images'
			});
			bucket.openDownloadStreamByName(fileName).pipe(res).on('error',
					function(error) {
					}).on('finish', function() {
			});
		});

	} catch (error) {
	}
};
