var mysql = require('./mysql');

var mongo = require("./mongo");
var mongodb = require('mongodb');
var database = "mongodb://localhost:27017/airbnb";
var fs = require('fs');

var uuid = require('node-uuid');

var crypto = require('crypto'), algorithm = 'aes-256-ctr', password = 'cmpe273_airbnb';

exports.login = function(req, res){
	res.render('adminLogin');
};

exports.searchBill = function(req, res){
	res.render('searchBill');
};

exports.adminLogin = function(req, res) {
	var email = req.param("email");
	var pwd = req.param("password");
	var encPwd = encrypt(pwd);
	var getAdmin = "select * from admin where email='" + email + "' and password='" + encPwd + "'";
	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
			var json_responses = {
				"statusCode" : "400"
			};
			res.send(json_responses);
		} else {
			if (results.length > 0) {
				var adminID = results[0].admin_id;
				console.log("valid Login");
				req.session.admin_id = adminID;
				var json_responses = {
					"statusCode" : "200",
					"admin_id" : adminID
				};
				console.log("index.js:" + json_responses);
				res.send(json_responses);

			} else {
				console.log("Invalid Login");
				var json_responses = {
					"statusCode" : "400"
				};
				res.send(json_responses);
			}
		}
	}, getAdmin);
};

exports.adminHome = function(req, res) {
	console.log("here");
	res.header('Cache-Control','no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
	res.render('adminHome', {
		title : 'Express'
	});
};

exports.adminActivity = function(req, res) {
	console.log("here");
	res.header('Cache-Control','no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
	res.render('adminActivity', {
		title : 'Express'
	});
};

exports.pendingRequest=function(req,res){
	var getPendingHostRequest = "select * from  user_profile where status = 1";
	mysql.fetchData(function(err, result){
		if (err) {
			throw err;
		} else{
			console.log(JSON.stringify(result));
			res.header('Cache-Control','no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
			res.render("pendingRequest", {pendingRequests:result});
		}
	},getPendingHostRequest);
};

exports.viewhost = function(req, res){
	var userid = JSON.stringify(req.params.userid);
	var query = "select t1.*,t2.* from  user_profile t1, listings t2 where t1.user_id= t2.host_id and t1.user_id="+userid+"";
	
	console.log(JSON.stringify(query));
	mysql.fetchData(function(err, result){
		if (err) {
			throw err;
		}
		else{
			res.header('Cache-Control','no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
			res.render("viewhost", {host:result});
		}
	},query);
};

exports.viewuser = function(req, res){
	var userid = JSON.stringify(req.params.userid);
	var query = "select t1.*, t2.* from user_profile t1, userreviews t2 where t1.user_id = t2.ruser_id and t1.user_id = " + userid +"";
	console.log(query);
	mysql.fetchData(function(err, result){
		if (err) {
			throw err;
		} else{
			res.header('Cache-Control','no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
			res.render("viewuser", {user:result});
		}
	},query);
};

exports.viewproperty = function(req, res){
	var userid = JSON.stringify(req.params.userid);
	var query = "select t1.*,t2.* from  user_profile t1, listings t2 where t1.user_id= t2.host_id"; 
	console.log(query);
	mysql.fetchData(function(err, result){
		if (err) {
			throw err;
		} else{
			res.header('Cache-Control','no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
			res.render("viewproperty", {property:result});
		}
	},query);
};

exports.displayHostsList=function(req,res){
	var query = "select t1.*, COUNT(*) as count from user_profile t1, listings t2 where status = 2 and t1.user_id = t2.host_id group by host_id";
	
	mysql.fetchData(function(err, result){
		if (err) {
			throw err;
		} else{
			res.header('Cache-Control','no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
			res.render("viewHosts", {hosts:result});
		}
	},query);
};

exports.searchhostby=function(req,res){
	var state = JSON.stringify(req.body.state);
	var city = req.body.city;
	var query = "select * from  user_profile where status = 2 and state = "+state+" and city like '%"+city+"%'";
	mysql.fetchData(function(err, result){
		if (err) {
			throw err;
		} else{
			res.header('Cache-Control','no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
			res.render("viewHosts", {hosts:result});
		}
	},query);
};

exports.displayUsersList=function(req,res){
	var query = "select * from  user_profile where status = 0";
	mysql.fetchData(function(err, result){
		if (err) {
			throw err;
		} else{
			res.header('Cache-Control','no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
			res.render("viewUsers", {users:result});
		}
	},query);
};

exports.displayPropertiesList=function(req,res){
	var query = "select * from  listings";
	mysql.fetchData(function(err, result){
		if (err) {
			throw err;
		} else{
			res.header('Cache-Control','no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
			res.render("viewProperties", {properties:result});
		}
	},query);
};

exports.getAdminDashboard = function(req, res) {
	console.log("here");
	res.header('Cache-Control','no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
	res.render('adminDashboard', {
		title : 'Express'
	});
};

exports.getAdminProfile = function(req, res) {
	var admin_id = req.session.admin_id;
	var getAdminProfile = "select * from  admin where admin_id = " + admin_id;
	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
			var json_responses = {
				"statusCode" : "400"
			};
			res.send(json_responses);
		} else {
			if (results.length > 0) {
				var adminProfile = results[0];
				var json_responses = {
					"statusCode" : "200",
					"adminProfile" : adminProfile
				};
				res.send(json_responses);
			} else {
				var json_responses = {
					"statusCode" : "400"
				};
				res.send(json_responses);
			}
		}
	}, getAdminProfile);
};

exports.updateAdminProfile = function(req, res) {
	var updates = req.param("updates");
	var updateAdminProfile = "update admin set ";
	if (updates.hasOwnProperty('fname')) {
		updateAdminProfile = updateAdminProfile + "first_name = '" + updates.fname + "',"
	}
	if (updates.hasOwnProperty('lname')) {
		updateAdminProfile = updateAdminProfile + "last_name = '" + updates.lname + "',"
	}

	if (updates.hasOwnProperty('phone_no')) {
		updateAdminProfile = updateAdminProfile + "phone_no = '" + updates.phone_no + "',"
	}
	if (updates.hasOwnProperty('address')) {
		updateProf = updateProf + "address = '" + updates.address + "',"
	}
	updateAdminProfile = updateAdminProfile + "admin_id=" + req.session.admin_id
			+ " where admin_id = " + req.session.admin_id;
	console.log(updateAdminProfile);

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
			}

			var json_responses = {
				"statusCode" : "200"
			};
			res.send(json_responses);

		}
	}, updateAdminProfile);
};


exports.approveHost=function(req,res){
	var user_id =req.body.user_id;
	var query = "Update user_profile set status = 2 where user_id ='" +user_id + "'";
	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
			var json_responses = {
				"statusCode" : "400"
			};
			res.send(json_responses);
		} 
		else {
			var json_response = {"status":"Approved"};
			res.send(json_response);
		}	
	}, query);
};

exports.rejectHost=function(req,res){
	var user_id =req.body.user_id;
	console.log(user_id);
	var query = "Update user_profile set status = 0 where user_id ='" +user_id + "'";
	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
			var json_responses = {
				"statusCode" : "400"
			};
			res.send(json_responses);
		} 
		else {
			var json_response = {"status":"Rejecteded"};
			res.send(json_response);
		}	
	}, query);
};
exports.listAllHost = function(req, res) {
	var admin_id = req.session.admin_id;
	var getAllHost = "select * from  hosts";
	console.log("Query is:" + getAllHost);
	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
			var json_responses = {
				"statusCode" : "400"
			};
			res.send(json_responses);
		} else {
			if (results.length > 0) {
				var host = results[0];
				var json_responses = {
					"statusCode" : "200",
					"host" : host
				};
				res.send(json_responses);
			} else {
				var json_responses = {
					"statusCode" : "400"
				};
				res.send(json_responses);
			}
		}
	}, getPendingHostRequest);
};

function encrypt(text) {
	var cipher = crypto.createCipher(algorithm, password);
	var crypted = cipher.update(text, 'utf8', 'hex');
	crypted += cipher.final('hex');
	return crypted;
}

exports.saveUserReview = function(req, res){
	var userid = JSON.stringify(req.params.userid);
	var rating = JSON.stringify(req.body.rating);
	var review = JSON.stringify(req.body.review);
	var query = "insert into user_reviews (user_id, review, rating) VALUES ("+ userid + ",'" + review + "','" + rating + "')";
	console.log(query);
	mysql.fetchData(function(err, result){
		if (err) {
			throw err;
		} else{
			res.header('Cache-Control','no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
			res.redirect('displayUsersList');
		}
	},query);
};

exports.saveHostReview = function(req, res){
	var userid = JSON.stringify(req.params.userid);
	var rating = JSON.stringify(req.body.rating);
	var review = JSON.stringify(req.body.review);
	var query = "insert into reviews (host_id, review, rating) VALUES ("+ userid + ",'" + review + "','" + rating + "')";
	console.log(query);
	mysql.fetchData(function(err, result){
		if (err) {
			throw err;
		} else{
			res.header('Cache-Control','no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
			res.redirect('displayHostsList');
		}
	},query);
};


exports.searchBillDetails = function(req, res){
	var month = req.body.month;

	console.log("/////////////// " + month);
	//var query = "select t2.billing_id, t2.month, t2.trip_id, t2.year, t2.user_id, t2.total, t3.prop_id, t3.host_id from airbnb.user_profile t1, airbnb.billing t2, airbnb.listings t3 where t2.month='"+month+"' and t3.host_id=t1.user_id";

var query = "select t2.billing_id, t2.month, t2.user_id, t2.total, t1.fname, t1.user_id from user_profile t1, trips t5 ,billing t2 ,listings t3 where t2.month='"+month+"' and t2.user_id=t1.user_id";
	console.log(query);
	mysql.fetchData(function(err, result){
		if (err) {
			throw err;
		} else{
			res.header('Cache-Control','no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
			res.render("viewBill", {bill:result});
		}
	},query);
};


function decrypt(text) {
	var decipher = crypto.createDecipher(algorithm, password);
	var dec = decipher.update(text, 'hex', 'utf8');
	dec += decipher.final('utf8');
	return dec;
}

exports.updatePhoto = function(req, res) {
	console.log("session id checking"+req.session.admin_id);
	var puidData = {};
	var postData = {};
	var imageID = uuid.v4() + ".png";
	puidData.images = [];
	puidData.images.push(imageID);
	puidData.videos = "";
	postData.puid = req.session.admin_id;
	postData[req.session.admin_id] = puidData;
	console.log(req.files.image.path);
	mongo.connect(database, function(connection) {
		var userCollection = mongo.connectToCollection('user', connection);

		userCollection.update({
			"puid" : req.session.admin_id
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
		var userCollection = mongo.connectToCollection('user', connection);

		userCollection.findOne({
			"puid" : req.session.admin_id
		}, function(error, result) {

			if (!error && result != null) {
				console.log(result);
				var imageUrl = result[req.session.admin_id].images[0];
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
