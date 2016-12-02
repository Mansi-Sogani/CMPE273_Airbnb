var trip = angular.module('trip', []);
// defining the login controller
trip
		.controller(
				'trip',
				function($scope, $http, $filter) {

					$scope.guest_error = true;
					$scope.date_error = true;
					$scope.unexpected_error = true;
					$scope.card_error = true;
					$scope.bid_success = true;
					$scope.validation_error = true;

					// getSession();
					getProfilePicFileName();
					getProfile();

					$scope.parent = {
						checkOut : ''
					};

					$scope.property = window.listing;
					var prop = $scope.property;
					for (i = 0; i < prop.length; i++) {
						prop = prop.replace('&#34;', '"');
					}
					prop = JSON.parse(prop);
					console.log(prop);

					$scope.bid = function() {
						console.log("here");
						console.log($scope.bid_amt);
						if ($scope.check_in == undefined
								|| $scope.check_out == undefined
								|| $scope.no_of_guests == undefined) {
							$scope.date_error = true;
							$scope.guest_error = true;
							$scope.unexpected_error = true;
							$scope.validation_error = false;
						} else {
							$http({
								method : "POST",
								url : '/bid',
								data : {
									"bid_amt" : $scope.bid_amt,
									"property" : $scope.property,
									"no_of_guests" : $scope.no_of_guests,
									"check_out" : $scope.check_out,
									"check_in" : $scope.check_in
								}
							}).success(function(data) {
								// checking the response data for statusCode
								if (data.statusCode == 400) {
									$scope.guest_error = false;
									$scope.date_error = true;
									$scope.unexpected_error = true;
									$scope.bid_success = true;
									$scope.validation_error = true;
								} else if (data.statusCode == 440) {
									$scope.date_error = false;
									$scope.guest_error = true;
									$scope.unexpected_error = true;
									$scope.bid_success = true;
									$scope.validation_error = true;
								} else if (data.statusCode == 200) {
									console.log("made offer");
									$scope.bid_success = false;
									$scope.guest_error = true;
									$scope.date_error = true;
									$scope.unexpected_error = true;
									$scope.validation_error = true;

								} else {
									console.log("cannot make offer");
									$scope.bid_success = true;
									$scope.guest_error = true;
									$scope.date_error = true;
									$scope.unexpected_error = false;

								}
								// Making a get call to the
								// '/redirectToHomepage' API
								// window.location.assign("/homepage");
							}).error(function(error) {
								$scope.bid_success = true;
								$scope.guest_error = true;
								$scope.date_error = true;
								$scope.unexpected_error = false;
							});
						}
					}

					$scope.property = prop;
					getHostProfilePicFileName();
					function getSession() {
						$http({
							method : "GET",
							url : '/getSession'
						}).success(function(data) {
							// checking the response data for statusCode
							if (data.statusCode == 200) {
								console.log("session exists");

								getProfile();
							} else {

								window.location.assign("/");
							}
							// Making a get call to the
							// '/redirectToHomepage' API
							// window.location.assign("/homepage");
						}).error(function(error) {
							$scope.validlogin = true;
							$scope.invalid_login = true;
						});
					}

					function getProfilePicFileName() {
						$http({
							method : "GET",
							url : '/getImageUrl'
						})
								.success(
										function(data) {
											// checking the response
											// data for statusCode
											if (data.statusCode == 200) {
												console.log("get host");
												console.log(data);
												$scope.imageUrl = "http://localhost:3001/getImageByUrl?profile_pic="
														+ data.url;

											} else {

											}
											// Making a get call to the
											// '/redirectToHomepage' API
											// window.location.assign("/homepage");
										}).error(function(error) {

								});
					}

					function getProfile() {
						$http({
							method : "POST",
							url : '/getProfile'
						}).success(function(data) {
							// checking the response data for statusCode
							if (data.statusCode == 200) {
								console.log(data);
								$scope.profile = data.profile;

							} else {

							}
							// Making a get call to the
							// '/redirectToHomepage' API
							// window.location.assign("/homepage");
						}).error(function(error) {
							$scope.validlogin = true;
							$scope.invalid_login = true;
						});
					}

					$scope.becomeHost = function() {
						console.log("become host");
						$http({
							method : "POST",
							url : '/becomeHost'
						}).success(function(data) {
							console.log("sent request to admin");
							window.location.assign("/home");
						}).error(function(error) {
							console.log("could not sent request to admin");
						});

					}

					function days_between(date1, date2) {

						// The number of milliseconds in one day
						var ONE_DAY = 1000 * 60 * 60 * 24

						// Convert both dates to milliseconds
						var date1_ms = date1.getTime()
						var date2_ms = date2.getTime()

						// Calculate the difference in milliseconds
						var difference_ms = Math.abs(date1_ms - date2_ms)

						// Convert back to days and return
						return Math.round(difference_ms / ONE_DAY)

					}

					function getHostProfilePicFileName() {
						$http({
							method : "POST",
							url : '/getHostImageUrl',
							data : {
								"user_id" : $scope.property.host_id
							}
						})
								.success(
										function(data) {
											// checking the response
											// data for statusCode
											if (data.statusCode == 200) {
												console.log("get url");
												$scope.hostImageUrl = "http://localhost:3001/getImageByUrl?profile_pic="
														+ data.url;
												console
														.log($scope.hostImageUrl);
											} else {

											}
											// Making a get call to the
											// '/redirectToHomepage' API
											// window.location.assign("/homepage");
										}).error(function(error) {

								});
					}

					$scope.viewPhotos = function() {
						console.log("vuew");
					}

					/*
					 * $scope.loadProperty = function() {
					 * 
					 * $http.get('/propertyDetail').success(function(data) {
					 * console.log(data); $scope.property = data; }) };
					 */

					$scope.listTrips = function() {

						$http.get('/getPendingTrips').success(function(data) {
							console.log("setting the data");
							$scope.pendingTrips = data;
						})
						$http.get('/getConfirmedTrips').success(function(data) {
							$scope.confirmedTrips = data;
						})

						$http.get('/getPastTrips').success(function(data) {
							$scope.pastTrips = data;
						})

					};

					$scope.bookTrip = function() {

						if ($scope.check_in == undefined
								|| $scope.check_out == undefined
								|| $scope.no_of_guests == undefined) {
							$scope.date_error = true;
							$scope.guest_error = true;
							$scope.unexpected_error = true;
							$scope.validation_error = false;
						} else {
							$http({
								method : "POST",
								url : '/book',
								data : {
									"no_of_guests" : $scope.no_of_guests,
									"check_out" : $scope.check_out,
									"check_in" : $scope.check_in,
									"property" : $scope.property
								}
							}).success(
									function(data) {
										if (data.statusCode == 400) {
											$scope.guest_error = false;
											$scope.date_error = true;
											$scope.unexpected_error = true;
											$scope.validation_error = true;
											$scope.bid_success = true;
										} else if (data.statusCode == 440) {
											$scope.date_error = false;
											$scope.guest_error = true;
											$scope.unexpected_error = true;
											$scope.validation_error = true;
											$scope.bid_success = true;
										} else if (data.statusCode == 200) {
											var checkIn = $filter('date')(
													$scope.check_in,
													"yyyy-MM-dd");
											var checkOut = $filter('date')(
													$scope.check_out,
													"yyyy-MM-dd");
											var url = "/bookTrip?checkIn="
													+ checkIn + "&checkOut="
													+ checkOut
													+ "&no_of_guests="
													+ $scope.no_of_guests
													+ "&propId="
													+ $scope.property.prop_id;

											console.log(url);
											window.location.assign(url);
										}

									}).error(function(error) {
								$scope.unexpected_error = false;
								$scope.guest_error = true;
								$scope.date_error = true;
								$scope.validation_error = true;
								$scope.bid_success = true;
							});
						}
					};

					$scope.changeTrip = function() {

						$http({
							method : "POST",
							url : '/change',
							data : {
								"no_of_guests" : $scope.no_of_guests,
								"check_out" : $scope.check_out,
								"check_in" : $scope.check_in
							}
						}).success(function(data) {
							if (data.statusCode == 400) {
								$scope.guest_error = false;
								$scope.date_error = true;
								$scope.unexpected_error = true;
							} else if (data.statusCode == 440) {
								$scope.date_error = false;
								$scope.guest_error = true;
								$scope.unexpected_error = true;
							} else if (data.statusCode == 200) {

								window.location.assign('/trips');
							}

						}).error(function(error) {
							$scope.unexpected_error = false;
							$scope.guest_error = true;
							$scope.date_error = true;
						});

					};

					$scope.resetErrors = function() {
						$scope.guest_error = true;
						$scope.date_error = true;
						$scope.unexpected_error = true;
						$scope.card_error = true;
						$scope.bid_success = true;
					};

					$scope.checkout = function() {

						if ($scope.no_of_guests == undefined) {
							$scope.date_error = true;
							$scope.guest_error = true;
							$scope.unexpected_error = true;
							$scope.bid_success = true;
							$scope.validation_error = false;
						} else {

							$http({
								method : "POST",
								url : '/checkouttrip',
								data : {
									"no_of_guests" : $scope.no_of_guests,
									"property" : $scope.property,
									/*
									 * "check_out" : $scope.check_out,
									 * "check_in" : $scope.check_in, "nights" :
									 * $scope.nights, "subtotal" :
									 * $scope.subtotal, "total" : $scope.total,
									 */
									"cardNumber" : $scope.cardNumber,
									"month" : $scope.month,
									"year" : $scope.year,
									"cvv" : $scope.cvv,
									"firstname" : $scope.firstname,
									"lastname" : $scope.lastname,
									"zip" : $scope.zip
								}
							})
									.success(
											function(data) {
												if (data.statusCode == 200) {
													var url = "/tripConfirmation?no_of_guests="
															+ $scope.no_of_guests+"&propId="
															+ $scope.property.prop_id;

													console.log(url);
													window.location.assign(url);
												} else if (data.statusCode == 404) {
													$scope.message = data.message;
													$scope.guest_error = true;
													$scope.date_error = true;
													$scope.unexpected_error = true;
													$scope.card_error = false;
													$scope.bid_success = true;
												}

											}).error(function(error) {
										$scope.guest_error = true;
										$scope.date_error = true;
										$scope.unexpected_error = false;
										$scope.card_error = true;
										$scope.bid_success = true;
									});
						}

					};

					$scope.alterTrip = function(trip) {

						var url = "/alterations?tripId=" + trip.trip_id;

						console.log(url);
						window.location.assign(url);
					};

					$scope.cancelTrip = function() {

						$http.get('/cancel').success(function(data) {
							console.log("successfully deleted");
							window.location.assign('/trips');

						})

					};

				})
