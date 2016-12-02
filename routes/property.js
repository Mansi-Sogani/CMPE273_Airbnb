var mysql = require('./mysql');

var mongo = require("./mongo");
var mongodb = require('mongodb');
var database = "mongodb://localhost:27017/airbnb";
var fs = require('fs');

var uuid = require('node-uuid');

var winston=require('winston');
var logger = new (winston.Logger)({
	  transports: [
	    new (winston.transports.Console)(),
	    new (winston.transports.File)({ filename: './Logs' +
	    '/userTracking.log'
	    })
	 ]
})
var logger1 = new (winston.Logger)({
	  transports: [
	    new (winston.transports.File)({ filename: './Logs' +
	    '/propertyClicks.log'
	    })
	 ]
})



exports.getPropertyDetailPage = function(req, res) {
	 if(req.session.user_id){
	var prop_id = req.query.property_id;
	
	console.log("search here");
	logger.info('landed on property search page',{userid:req.session.user_id});
	//var searchProp ="select * from listings where prop_id = " + prop_id;
	var searchProp ="select t1.*,t2.* from user_profile t1, listings t2 where t1.user_id = t2.host_id and t2.prop_id = " + prop_id;
	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
			console.log(err);
			var json_responses = {
				"statusCode" : "400"
			};
			res.send(json_responses);
		} else {

			var listings = results;
			console.log(results.length);
			console.log("listings");

			res.render("propertyDetail", {
				"statusCode" : "200",
				"property" : results[0],
				
			});
			
			var propertyid=prop_id; ///give prop_id over here
			 var hostid=req.session.user_id;  ///give host id over here 
			 logger1.info('clicked this property',{propertyid:propertyid,hostid:hostid});

		}
	}, searchProp);
		}
		else{
			res.render('landing');
		}
	
};

exports.searchProperty = function(req, res) {
	logger.info('user landed on search page',{userid:req.session.user_id});

	var dest = req.query.dest;
	var checkIn = req.query.checkIn;
	var checkOut = req.query.checkOut;
	var guests = req.query.guests;
	var priceTo = req.query.priceTo;
	var priceFrom = req.query.priceFrom;
	var home = req.query.home;
	var private = req.query.private;
	var shared = req.query.shared;
	console.log(req.query);
	if (dest == undefined || dest == 'undefined') {
		console.log("here");
		dest = "";
	}
	if (checkIn == undefined || checkIn == 'undefined')
		checkIn = "";
	if (checkOut == undefined || checkOut == 'undefined')
		checkOut = checkIn;
	if (guests == undefined || guests == 'undefined')
		guests = 0;
	if (priceTo == undefined || priceTo == 'undefined')
		priceTo = 1000000;
	if (priceFrom == undefined || priceFrom == 'undefined')
		priceFrom = 0;

	var category = "";
	if (home === "true" || private === "true" || shared === "true") {
		console.log("cate");
		category = category + " and category in (";
		var check = 0;
		if (home == "true") {
			category = category + "'Entire Home'";
			check = 1;
		}
		if (private == "true") {
			if (check == 1) {
				category = category + ",'Private Room'";
			} else {
				category = category + "'Private Room'";
			}
			check = 1;
		}
		if (shared == "true") {
			if (check == 1) {
				category = category + ",'Shared Room'";
			} else {
				category = category + "'Shared Room'";
			}
			check = 1;
		}

		category = category + ")";
	}
	console.log(category);
	console.log(dest);
	var searchData = {
		"dest" : dest,
		"checkIn" : checkIn,
		"checkOut" : checkOut,
		"guests" : guests
	}

	var searchProp = "select * from  listings where host_id !="
			+ req.session.user_id + " and date(fromdate) <=  date('" + checkIn
			+ "') and date(todate) >=  date('" + checkOut + "') and guests >="
			+ guests + " and (state like('%" + dest + "%') or city like ('%"
			+ dest + "%') or zip like ('%" + dest + "%')) and price >=" + priceFrom + " and price <="+priceTo + category;

	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
			console.log(err);
			var json_responses = {
				"statusCode" : "400"
			};
			res.send(json_responses);
		} else {

			var listings = results;
			console.log(results.length);
			console.log("listings");

			res.render("searchResults", {
				"statusCode" : "200",
				"listings" : results,
				"searchData" : searchData
			});

		}
	}, searchProp);
	
};