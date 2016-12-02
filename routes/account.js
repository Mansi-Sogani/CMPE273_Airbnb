var mysql = require('./mysql');

var crypto = require('crypto'), algorithm = 'aes-256-ctr', password = 'cmpe273_airbnb';

//sreekar latest
var winston=require('winston');
var logger = new (winston.Logger)({
	  transports: [
	    new (winston.transports.Console)(),
	    new (winston.transports.File)({ filename: './Logs' +
	    '/userTracking.log'
	    })
	 ]
})


exports.getAccountPage = function(req, res) {
	 if(req.session.user_id){

			res
					.header(
							'Cache-Control',
							'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');

			res.render('account', {
				title : 'Express'
			});
			logger.info('user landed on accounts page',{userid:req.session.user_id});
	}
	else{
		res.render('landing');
	}

	
};

exports.cancelAccount = function(req, res) {
	logger.info('user canceled his account',{userid:req.session.user_id});

	var cancelAcc = "update user_auth set isDeleted = 1 where user_id = "
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
		}
	}, cancelAcc);
};

exports.updatePassword = function(req, res) {
	logger.info('user updated his password',{userid:req.session.user_id});
	var pwd = req.param("password");
	console.log("pwd");
	console.log(req);
	var encPwd = encrypt(pwd);
	var updatePassword = "update user_auth set password = '" + encPwd
			+ "' where user_id =" + req.session.user_id;

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
		}
	}, updatePassword);
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