var mysql = require('./mysql');


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


exports.makeOffer = function(req, res) {
	logger.info('landed on bid page',{userid:req.session.user_id});
	var bid_amt = req.param("bid_amt");
	var property = req.param("property");
	var no_of_guests = req.param("no_of_guests");
	var check_out = req.param("check_out");
	var check_in = req.param("check_in");
	var bidQuery ="insert into bid_table (user_id,prop_id,bid_amt,creation_time) VALUES ("  + req.session.user_id + "," + property.prop_id + "," + bid_amt +", NOW() )";
	if (no_of_guests > property.guests) {
		json_responses = {
			"statusCode" : 400
		};
		res.send(json_responses);
	} else if ((new Date(check_out)).getTime() <= (new Date(check_in)).getTime()) {
		json_responses = {
			"statusCode" : 440
		};
		res.send(json_responses);
	} else {
		mysql.fetchData(function(err, results) {
			if (err) {
				throw err;
				console.log(err);
				var json_responses = {
					"statusCode" : "500"
				};
				res.send(json_responses);
			} else {

				var json_responses = {
						"statusCode" : "200"
					};
					res.send(json_responses);

			}
		}, bidQuery);

	}
	
	
};