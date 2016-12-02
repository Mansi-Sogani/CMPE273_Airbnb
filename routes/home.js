/**
 * http://usejsdoc.org/
 */

var mysql = require('./mysql');

var crypto = require('crypto'), algorithm = 'aes-256-ctr', password = 'cmpe273_airbnb';

var winston=require('winston');

//declaring logger

var logger = new (winston.Logger)({
	  transports: [
	    new (winston.transports.Console)(),
	    new (winston.transports.File)({ filename: './Logs' +
	    '/userTracking.log'
	    })
	 ]
})

exports.login = function(req, res) {

	var email = req.param("email");
	var pwd = req.param("password");

	var encPwd = encrypt(pwd);
	// console.log(encPwd);
//	var getUser = "select * from user_auth where email='" + email
//			+ "' and password='" + encPwd + "' and isDeleted =0";
	
	var getUser = "select t1.*,t2.* from user_auth t1, user_profile t2 where t1.email='" + email
	+ "' and t1.password='" + encPwd + "' and t1.isDeleted =0 and t1.user_id = t2.user_id";
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
				var userID = results[0].user_id;
				var status = results[0].status;
				var lname = results[0].lname;
				console.log(results[0].user_id);
				console.log("valid Login");
				req.session.user_id = userID;
				req.session.lname = lname;
				req.session.status = status;
				var json_responses = {
					"statusCode" : "200",
					"user_id" : userID
				};
				res.send(json_responses);
				logger.info('user signed on successfully',{userid:req.session.user_id})
				

			} else {
				console.log("Invalid Login");
				json_responses = {
					"statusCode" : "400"
				};
				res.send(json_responses);

			}

		}
	}, getUser);
};

exports.signup = function(req, res) {
	console.log("Signup");
	var pwd = req.param("password");
	var email = req.param("email");
	var fname = req.param("fname");
	var phone = req.param("phone");
	var lname = req.param("lname");
	var fname = req.param("fname");
	var birthday = req.param("dob");
	var street = req.param("street");
	var apt = req.param("apt");
	var state = req.param("state");
	var city = req.param("city");
	var zip = req.param("zip");

	var encPwd = encrypt(pwd);
	var addUser = "insert into user_auth (email,password,isDeleted) VALUES ('"
			+ email + "','" + encPwd + "',0)";
	mysql
			.fetchData(
					function(err, results) {
						if (err) {
							if (err.code === 'ER_DUP_ENTRY') {
								console.log('username already used');
								var json_responses = {
										"statusCode" : "400"
									};

									res
											.send(json_responses);
							}
							console.log(err);
						} else {
							var userID;
							var getId = "select user_id as id from user_auth where email = '"+ email +"'";
							mysql
									.fetchData(
											function(err, results) {
												if (err) {
													console.log(err);
													var json_responses = {
														"statusCode" : "400"
													};
													res.send(json_responses);
												} else {
													userID = results[0].id;
													console.log("id");
													console.log(userID);
													var addProfile = "INSERT INTO user_profile (user_id, fname, lname, birthday,street,apartment,city,state,zip_code,phone_no,status) VALUES ('"
															+ userID
															+ "','"
															+ fname
															+ "','"
															+ lname

															+ "','"
															+ birthday
															+ "','"

															+ street + "','"

															+ apt + "','"

															+ city + "','"

															+ state + "','"

															+ zip + "','"

															+ phone + "',0)";

													mysql
															.fetchData(
																	function(
																			err,
																			results) {
																		if (err) {
																			console
																					.log(err);
																			var json_responses = {
																				"statusCode" : "400"
																			};
																			res
																					.send(json_responses);
																		} else {
																			console
																					.log("ashna4");
																			var json_responses = {
																																									title : 'Vacation Rentals',
																				"statusCode" : "200",
																				"user_id" : userID
																			};

																			req.session.user_id = userID;
																			console
																					.log(userID);
																			res
																					.send(json_responses);

																		}
																	},
																	addProfile);
												}
											}, getId);

						}
					}, addUser);

};

exports.getHomePage = function(req, res) {
	
	 if(req.session.user_id){

		 res
			.header(
					'Cache-Control',
					'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
	     

	res.render('home', {
		title : 'Vacation Rentals'
	});
	logger.info('landed on homepage',{userid:req.session.user_id})	;

	}
	else{
		res.render('landing');
	}

	

};

exports.logout = function(req, res) {

	console.log("here");
	logger.info('user signed out of application',{userid:req.session.user_id});
	req.session.destroy();

	res
			.header(
					'Cache-Control',
					'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');

	res.render('landing', {
		title : 'Airbnb'
	});

};

exports.becomeHost = function(req, res) {


	var updateStatus = "update user_profile set status = 1 where user_id = "
			+ req.session.user_id;
	// console.log("Query is:" + getUser);
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
			res.send(json_responses);
			logger.info('user requested to becomehost ',{userid:req.session.user_id})
			req.session.status = 1;
		}
	}, updateStatus);

};

function encrypt(text) {
	var cipher = crypto.createCipher(algorithm, password)
	var crypted = cipher.update(text, 'utf8', 'hex')
	crypted += cipher.final('hex');
	return crypted;
}

function decrypt(text) {
	var decipher = crypto.createDecipher(algorithm, password)
	var dec = decipher.update(text, 'hex', 'utf8')
	dec += decipher.final('utf8');
	return dec;
}