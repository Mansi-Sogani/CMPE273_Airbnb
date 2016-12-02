/**
 * New node file
 */
var credit = require('./creditCard');
var mysql = require('./mysql');

var winston=require('winston');
var logger = new (winston.Logger)({
	  transports: [
	    new (winston.transports.Console)(),
	    new (winston.transports.File)({ filename: './Logs' +
	    '/userTracking.log'
	    })
	 ]
})

exports.bookTrip = function(req, res) {
	// Checks before redirecting whether the session is valid
	
	
	if (req.session.user_id) {

		var no_of_guests = req.param("no_of_guests");
		var check_out = req.param("check_out");
		var check_in = req.param("check_in");
		var property = req.param("property");
		// req.session.property = property;
		console.log("+++"+check_in);
		
		var flag = 0;
		var today = new Date();
		var json_responses = [];
		// var datePattern = /^\d{1,2}\/\d{1,2}\/\d{4}$/;

		

			/*
			 * var arr1 = check_out.split("/"); var arr2 = check_in.split("/");
			 * 
			 * if (Number(arr1[2]) < Number(arr2[2])) {
			 * 
			 * flag = 1;
			 *  } else if (Number(arr1[2]) == Number(arr2[2])) { if
			 * (Number(arr1[1]) < Number(arr2[1])) {
			 * 
			 * flag = 1; } else if (Number(arr1[1]) == Number(arr2[1])) { if
			 * (Number(arr1[0]) <= Number(arr2[0])) {
			 * 
			 * flag = 1; } }
			 *  }
			 */

		
		console.log("check_out:"+check_out);
		console.log("check_in:"+check_in);
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
			console.log("success");
			json_responses = {
				"statusCode" : 200
			};
			res.send(json_responses);
			logger.info('landed on property booking page',{userid:req.session.user_id});

		}

	} else {
		res.redirect('/');
		// res.render('login', { title: 'Login' });
	}
};

exports.changeTrip = function(req, res) {
	// Checks before redirecting whether the session is valid
	logger.info('landed on trip page',{userid:req.session.user_id});


	if (req.session.user_id) {

		var no_of_guests = req.param("no_of_guests");
		var check_out = req.param("check_out");
		var check_in = req.param("check_in");
		var trip = req.session.tripToAlter;
		var flag = 0;
		var today = new Date();
		var json_responses = [];
		

		

			/*
			 * var arr1 = check_out.split("/"); var arr2 = check_in.split("/");
			 * 
			 * if (Number(arr1[2]) < Number(arr2[2])) {
			 * 
			 * flag = 1;
			 *  } else if (Number(arr1[2]) == Number(arr2[2])) { if
			 * (Number(arr1[1]) < Number(arr2[1])) {
			 * 
			 * flag = 1; } else if (Number(arr1[1]) == Number(arr2[1])) { if
			 * (Number(arr1[0]) <= Number(arr2[0])) {
			 * 
			 * flag = 1; } }
			 *  }
			 */
		console.log("check_out:"+check_out);
		console.log("check_in:"+check_in);

		if (no_of_guests > trip.guests) {
			json_responses = {
				"statusCode" : 400
			};
			res.send(json_responses);
		} else if (check_out.getTime() <= check_in.getTime()) {
			json_responses = {
				"statusCode" : 440
			};
			res.send(json_responses);
		} else {
			console.log("success");

			var updateTrip = "update trips set No_of_guests=" + no_of_guests
					+ ",check_in='" + arr2[2] + "-" + arr2[0] + "-" + arr2[1]
					+ "',check_out='" + arr1[2] + "-" + arr1[0] + "-" + arr1[1]
					+ "',status=0 where trip_id=" + trip.trip_id;
			console.log(updateTrip);

			mysql.fetchData(function(err, results) {
				console.log("DB Results:" + results);
				if (err) {
					throw err;
				} else {
					json_responses = {
						"statusCode" : 200
					};
					res.send(json_responses);

				}
			}, updateTrip);

		}

	} else {
		res.redirect('/');
		// res.render('login', { title: 'Login' });
	}
};

exports.cancelTrip = function(req, res) {
	// Checks before redirecting whether the session is valid
	logger.info('landed on trip page',{userid:req.session.user_id});
	
	if (req.session.user_id) {

		var trip = req.session.tripToAlter;
		console.log(trip);

		var deleteTrip = "update trips set isDeleted=1 where trip_id="
				+ trip.trip_id;
		console.log(deleteTrip);

		mysql.fetchData(function(err, results) {
			console.log("DB Results:" + results);
			if (err) {
				throw err;
			} else {
				res.send(results);

			}
		}, deleteTrip);

	} else {
		res.redirect('/');
		// res.render('login', { title: 'Login' });
	}
};

exports.checkout = function(req, res) {
	// Checks before redirecting whether the session is valid
	
	if (req.session.user_id) {

		console.log("checkout");

		var no_of_guests = req.param("no_of_guests");
		//var check_out = req.param("check_out");
		//var check_in = req.param("check_in");
		var property = req.param("property");
		var cardNumber = req.param("cardNumber");
		var month = req.param("month");
		var year = req.param("year");
		var cvv = req.param("cvv");
		var firstname = req.param("firstname");
		var lastname = req.param("lastname");
		var zip = req.param("zip");
		//var property = req.session.property;
		var check_in = req.session.check_in;
		console.log("+++"+check_in);
		var check_out = req.session.check_out;
		var nights = req.session.nights;
		var subtotal = req.session.subtotal;
		var total = req.session.total;
		
		

		var today = new Date();
		var json_responses = [];

		if (no_of_guests > property.guests) {
			json_responses = {
				"statusCode" : 400
			};
			res.send(json_responses);
		} else {

			credit
					.valiadteCard(
							function(data) {
								if (data.statusCode == 200) {
									req.session.user_id = 123456796;
									var insertPayment = "insert into payment (user_id,cardnumber,cvv,exp_date,firstname,lastname,zip) VALUES ("
											+ req.session.user_id
											+ ",'"
											+ cardNumber
											+ "',"
											+ cvv
											+ ",'"
											+ year
											+ "-"
											+ month
											+ "-01','"
											+ firstname
											+ "','"
											+ lastname
											+ "'," + zip + ")";

									mysql
											.fetchData(
													function(err, results) {
														if (err) {
															throw err;
															console.log(err);
															var json_responses = {
																"statusCode" : "400"
															};
															res
																	.send(json_responses);
														} else {

															var insertTrip = "insert into trips (user_id,prop_id,check_in,check_out,host_id,no_of_guests,status,isDeleted) VALUES ("
																	+ req.session.user_id
																	+ ","
																	+ property.prop_id
																	+ ",date('"
																	+ check_in + "'),date('"
																	+ check_out + "'),"
																	+ property.host_id
																	+ ","
																	+ no_of_guests
																	+ ","
																	+ 0
																	+ ","
																	+ 0
																	+ ")";

															mysql
																	.fetchData(
																			function(
																					err,
																					results) {
																				if (err) {
																					throw err;
																					console
																							.log(err);
																					var json_responses = {
																						"statusCode" : "400"
																					};
																					res
																							.send(json_responses);
																				} else {

																					var json_responses = {
																						"statusCode" : "200"
																					};
																					res
																							.send(json_responses);

																				}
																			},
																			insertTrip);
														}
													}, insertPayment);

								} else {
									res.send(data);
								}

							}, req);

		}

		// res.render("reservation");
	} else {
		res.redirect('/');
		// res.render('login', { title: 'Login' });
	}
};

exports.bookTripView = function(req, res) {
	// Checks before redirecting whether the session is valid
	logger.info('landed on trip page',{userid:req.session.user_id});

	
	if (req.session.user_id) {

		var checkIn = req.query.checkIn;
		var checkOut = req.query.checkOut;
		var no_of_guests = req.query.no_of_guests;
		var propId = req.query.propId;
		var date1 = new Date(checkIn);
		var date2 = new Date(checkOut);
		var timeDiff = Math.abs(date2.getTime() - date1.getTime());
		var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
		
		
		var searchProp ="select t1.*,t2.* from user_profile t1, listings t2 where t1.user_id = t2.host_id and t2.prop_id = " + propId;
		mysql.fetchData(function(err, results) {
			if (err) {
				throw err;
				console.log(err);
			} else {

				var property = results[0];
				var subtotal = diffDays * property.price;
				var total = subtotal + 40;
				 req.session.nights = diffDays; 
				 req.session.subtotal = subtotal;
				 req.session.total = total;
				 req.session.check_in = checkIn;
				 req.session.check_out = checkOut;
				res.render("bookTrip", {
					"checkIn" : checkIn,
					"checkOut" : checkOut,
					"no_of_guests" : no_of_guests,
					"property" : property,
					"nights" : diffDays,
					"subtotal" : subtotal,
					"total" : total

				});

			}
		}, searchProp);

	
		
	} else {
		res.redirect('/');
		// res.render('login', { title: 'Login' });
	}
};

exports.viewTrips = function(req, res) {
	// Checks before redirecting whether the session is valid
	
	if (req.session.user_id) {

		
		res.render("trips", {
			"property" : " "

		});
	} else {
		res.redirect('/');
		// res.render('login', { title: 'Login' });
	}
};

exports.confirmation = function(req, res) {
	// Checks before redirecting whether the session is valid
	
	if (req.session.user_id) {
		
		var no_of_guests = req.query.no_of_guests;
		var propId = req.query.propId;
		console.log(no_of_guests);
		var searchProp ="select t1.*,t2.* from user_profile t1, listings t2 where t1.user_id = t2.host_id and t2.prop_id = " + propId;
		
		mysql.fetchData(function(err, results) {
			if (err) {
				throw err;
				console.log(err);
			} else {

				var property = results[0];
				res.render("reservation", {
					"checkIn" : req.session.check_in,
					"checkOut" : req.session.check_out,
					"no_of_guests" : no_of_guests,
					"property" : property,
					"nights" : req.session.nights,
					"subtotal" : req.session.subtotal,
					"total" : req.session.total

				});

			}
		}, searchProp);

		

	} else {
		res.redirect('/');
		// res.render('login', { title: 'Login' });
	}
};

exports.getPendingTrips = function(req, res) {
	// Checks before redirecting whether the session is valid
	
	if (req.session.user_id) {

		var getPendingTrips = "select * from trips INNER JOIN listings ON trips.prop_id = listings.prop_id where trips.user_id="
				+ req.session.user_id
				+ " and trips.status=0 and trips.isDeleted=0";
		console.log(getPendingTrips);

		mysql.fetchData(function(err, results) {
			console.log("DB Results:" + results);
			if (err) {
				throw err;
			} else {
				res.send(results);

			}
		}, getPendingTrips);

	} else {
		res.redirect('/');
		// res.render('login', { title: 'Login' });
	}
};

exports.getConfirmedTrips = function(req, res) {
	// Checks before redirecting whether the session is valid
	logger.info('landed on trip page',{userid:req.session.user_id});
	var currentdate = new Date();
	if (req.session.user_id) {

		var getConfirmedTrips = "select * from trips INNER JOIN listings ON trips.prop_id = listings.prop_id where trips.user_id="
				+ req.session.user_id
				+ " and trips.status=1 and date(trips.check_out) > now() and trips.isDeleted=0";

		console.log(getConfirmedTrips);

		mysql.fetchData(function(err, results) {
			console.log("DB Results:" + results);
			if (err) {
				throw err;
			} else {
				res.send(results);

			}
		}, getConfirmedTrips);

	} else {
		res.redirect('/');
		// res.render('login', { title: 'Login' });
	}
};

exports.getPastTrips = function(req, res) {
	// Checks before redirecting whether the session is valid
	
	var currentdate = new Date();
	if (req.session.user_id) {

		var getPastTrips = "select * from trips INNER JOIN listings ON trips.prop_id = listings.prop_id where trips.user_id="
				+ req.session.user_id
				+ " and trips.status=1 and  date(trips.check_out) < now() and trips.isDeleted=0";
		console.log(getPastTrips);

		mysql.fetchData(function(err, results) {
			console.log("DB Results:" + results);
			if (err) {
				throw err;
			} else {
				res.send(results);

			}
		}, getPastTrips);

	} else {
		res.redirect('/');
		// res.render('login', { title: 'Login' });
	}
};

exports.alterTrips = function(req, res) {
	// Checks before redirecting whether the session is valid
	

	if (req.session.user_id) {

		var tripId = req.query.tripId;

		var getTripDetails = "select * from trips INNER JOIN listings ON trips.prop_id = listings.prop_id where trips.trip_id="
				+ tripId;

		mysql.fetchData(function(err, results) {
			console.log("DB Results:" + results);
			if (err) {
				throw err;
			} else {
				console.log("###" + results[0]);
				req.session.tripToAlter = results[0];

				res.render("alterations", {
					"trip" : results[0]

				});

			}
		}, getTripDetails);

	} else {
		res.redirect('/');
		// res.render('login', { title: 'Login' });
	}
};

exports.cancelTrips = function(req, res) {
	// Checks before redirecting whether the session is valid
	
	if (req.session.user_id) {

		res.render("canceltrip", {
			"trip" : req.session.tripToAlter

		});

	} else {
		res.redirect('/');
		// res.render('login', { title: 'Login' });
	}
};

exports.changeTrips = function(req, res) {
	// Checks before redirecting whether the session is valid
	
	if (req.session.user_id) {

		res.render("changetrip", {
			"trip" : req.session.tripToAlter

		});
	} else {
		res.redirect('/');
		// res.render('login', { title: 'Login' });
	}
};
