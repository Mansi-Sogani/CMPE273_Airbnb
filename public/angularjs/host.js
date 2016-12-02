var hostang = angular.module('hostapp', []);


hostang.filter("trustUrl", ['$sce', function ($sce) {
        return function (recordingUrl) {
            return $sce.trustAsResourceUrl(recordingUrl);
        };
    }]);

hostang
		.controller(
				'hostcontroller',
				function($scope, $http) {

					$scope.listings = [];
					$scope.requestss = [];
					$scope.reservations = [];
					$scope.creservations = [];
					$scope.reviews = [];

					$scope.uploadmyvideo = false;
					$scope.hostvideopresent = false;
					$scope.nohostvideopresent = false;
					$scope.justhidethis = false;
					$scope.no_video_selected = false;

					$scope.nolistingss = false;
					$scope.yeslistingss = false;

					/*
					 * $scope.nohostimagepresent=false;
					 * $scope.hostimagepresent=false;
					 */

					$scope.pictureno_limit = false;
					$scope.incomplete_listing = false;
					$scope.invalid_entry = false;
					$scope.listing_created = false;
					$scope.defaultpage = true;

					$scope.norequests = false;
					$scope.yesrequests = false;
					$scope.yesreviews = false;
					$scope.noreviews = false;

					$scope.yesreservations = false;
					$scope.noreservations = false;

					$scope.deactivateaccount = false;

					$scope.yescreservations = false;
					$scope.nocreservations = false;
					$scope.userreviews = false;
					$scope.providereview = false;
					$scope.justhidethisalso = false;

					var videoFile;
					var imageFile1 = undefined;
					var noofimages;

					isNumber = function(n) {
						var yeah = 1;
						if (n < 0)
							yeah = 0;
						console.log("n is " + n);
						console.log("yeah is " + yeah);
						return !isNaN(parseFloat(n)) && isFinite(n) && yeah;
					}

					/* INTRO VIDEO */
					
					
											$scope.getcurrenthostID = function() {
						console.log("entered getcurrenthostID");
						$http({
							method : "POST",
							url : '/gethostID',
							data : {

							}
						}).success(function(data) {
							// checking the response data for statusCode
							if (data.statusCode == 200) {
								console.log("recieved 200 in getcurrenthostID");
								$scope.myhostID = data.thisisyourID;
								console.log("YOUR ID IS: " + $scope.myhostID);
								$scope.airbnbV = 'http://localhost:3001/getintrovideo/?host_id=' + $scope.myhostID;
								$scope.isthereintrovideo();

							} else {
								console.log("recieved 201: this will never happen");

							}

						}).error(function(error) {
							console.log("some error in getcurrenthostID")
						});

					};

					$scope.getcurrenthostID();
					//$scope.airbnbV = "http://localhost:3001/getintrovideo/?host_id=123456796";
					//$scope.airbnbV = 'http://localhost:3001/getintrovideo/?host_id=' + $scope.myhostID;
					
							/*$scope.getIframeSrc = function () {
							
							var linky='http://localhost:3001/getintrovideo/?host_id=' + $scope.myhostID;
							console.log("creating the video link: " + link);
							return linky;
							
							};*/
							
					$scope.uploadvideo = function() {
						console.log('invoked uploadvideo function');
						$scope.uploadmyvideo = !($scope.uploadmyvideo);
					};

					$scope.uploadVideoFile = function(files) {
						console.log('files is ' + files);
						videoFile = files;
					};

					$scope.upload_video = function() {

						if (videoFile != undefined) {
							var reqData = new FormData();
							reqData.append("video", videoFile[0]);
							$http({
								method : 'POST',
								url : '/uploadintrovideo',
								// url: '/uploadpicture',
								data : reqData,
								headers : {
									'Content-Type' : undefined
								},
								transformRequest : angular.identity
							}).success(function(data) {
								// alert("successfully sent the video");
								window.location.assign("/hostintrovideo");
							});

						} else {
							$scope.no_video_selected = true;
						}

					};

					$scope.isthereintrovideo = function() {
						console.log("entered isthereintrovideo");
						$http({
							method : "POST",
							url : '/isthereintrovideo',
							data : {
							"hostID" : $scope.myhostID
							}
						})
								.success(
										function(data) {
											// checking the response data for
											// statusCode
											if (data.statusCode == 200) {
												console
														.log("recieved 200 in isthereintrovideo");
												$scope.hostvideopresent = true;
												$scope.nohostvideopresent = false;
											} else if (data.statusCode == 401) {
												console
														.log("recieved 401 in isthereintrovideo");
												$scope.nohostvideopresent = true;
												$scope.hostvideopresent = false;
											}

										})
								.error(
										function(error) {
											console
													.log("some error in isthereintrovideo-angular file")
										});

					};

					

					/*
					 * $scope.isthereanimage = function() { console.log("entered
					 * isthereanimage"); $http({ method : "POST", url :
					 * '/isthereanimage', data : {
					 *  } }).success(function(data) { //checking the response
					 * data for statusCode if (data.statusCode == 200) {
					 * console.log("recieved 200 in isthereanimage");
					 * $scope.hostimagepresent=true;
					 * $scope.nohostimagepresent=false; } else if
					 * (data.statusCode == 401){ console.log("recieved 401 in
					 * isthereanimage"); $scope.nohostimagepresent=true;
					 * $scope.hostimagepresent=false; }
					 * 
					 * }).error(function(error) { console.log("some error in
					 * isthereanimage-angular file") });
					 *  }; //$scope.isthereanimage();
					 */

					/* LISTINGS */
					$scope.getlistings = function() {
						console.log("entered getlistings");
						$http({
							method : "POST",
							url : '/getmylistings',
							data : {

							}
						}).success(function(data) {
							// checking the response data for statusCode
							if (data.statusCode == 200) {
								console.log("recieved 200 in getlistings");
								$scope.listings = data.listings_list;
								$scope.resultlength = data.results_length;
								$scope.nolistingss = false;
								$scope.yeslistingss = true;
							} else {
								console.log("recieved 201");

								$scope.yeslistingss = false;
								$scope.nolistingss = true;
								// put some default message when no listings
							}

						}).error(function(error) {
							console.log("some error in homepage-angular file")
						});

					};

					$scope.getlistings();

					$scope.deletelisting = function(listing) {
						console.log("entered deletelisting");
						console.log("listing.prop_id is " + listing.prop_id);
						$http({
							method : "POST",
							url : '/deletelisting',
							data : {
								"listing-id" : listing.prop_id
							}
						})
								.success(
										function(data) {
											// checking the response data for
											// statusCode
											if (data.statusCode == 300) {
												console
														.log("recieved 300 in delete listing");
												window.location
														.assign("/hostlistings");
											} else {
												console
														.log("dint recieeve 300; some eroor while removing the item from the lsiting");
											}

										})
								.error(
										function(error) {
											console
													.log("some error in homepage-angular file")
										});

					};

					$scope.createnewlisting = function() {
						console.log("entered createnewlisting");
						window.location.assign("/createnewlisitng");
					};

					/* ADD NEW LISTING */
					$scope.cancellisting = function() {
						console.log("entered cancellisting");
						window.location.assign("/hostlistings");
					};

					$scope.category_value = function(value) {
						$scope.category_model = value;
					};

					$scope.rating = function(value) {
						$scope.rating_model = value;
					};

					$scope.findinmap = function() {
						console.log("entered findinmap");
						console.log(street + apt + city + state + street);
						if ($scope.street_model != undefined) {
							if ($scope.apt_model != undefined) {
								if ($scope.city_model != undefined) {
									if ($scope.state_model != undefined) {
										$scope.full_address = $scope.street_model
												+ ', '
												+ $scope.apt_model
												+ ', '
												+ $scope.city_model
												+ ', ' + $scope.state_model;
									} else {
										$scope.full_address = $scope.street_model
												+ ', '
												+ $scope.apt_model
												+ ', ' + $scope.city_model;
									}
								} else {
									$scope.full_address = $scope.street_model
											+ ', ' + $scope.apt_model;
								}
							} else {
								$scope.full_address = $scope.street_model;
							}
						}

						console.log("full_address is " + $scope.full_address);
						$scope.search_model = $scope.full_address;
					};

					$scope.latlong = function() {
						$scope.lat_model = angular.element($('#lat')).val();
						$scope.long_model = angular.element($('#long')).val();
						console.log("lati is " + $scope.lat_model);
						console.log("longi is " + $scope.long_model);
					};

					$scope.uploadImageFile = function(files) {
						console.log('files is ' + files);

						imageFile1 = files;
						noofimages = imageFile1.length;

					};

					$scope.upload_images = function(prop_id) {
						var reqData = new FormData();

						for (var i = 0; i < (imageFile1.length); i++) {
							// image has to be changed with the property id
							// returned by the publish listing function
							var temp = 'image' + i;
							reqData.append(temp, imageFile1[i]);
							
						}

						$http({
							method : 'POST',
							url : '/uploadptyimages/' + prop_id,
							data : reqData,
							headers : {
								'Content-Type' : undefined
							},
							transformRequest : angular.identity
						}).success(function(data) {
							// alert("successfully sent the images");
							 $scope.listing_created=true;
							 $scope.defaultpage=false;
							// MODIFY THIS PART TO REDIRECT TO HOST LISTINGS
							// window.location.assign("/hostintrovideo");
						});

					};

					$scope.publishlisting = function() {
						console.log("entered publishlisting");
						$scope.lat_model = angular.element($('#lat')).val();
						$scope.long_model = angular.element($('#long')).val();
						if ($scope.lat_model == '')
							$scope.lat_model = undefined;
						if ($scope.long_model == '')
							$scope.long_model = undefined;

						if (($scope.from_date_model > $scope.to_date_model) || ($scope.from_date_model == $scope.to_date_model))
							console.log("BOWWWWWWW");
						else
							console.log("MEOOOOOOOOW");

						console.log($scope.title_model + ', '
								+ $scope.category_model + ', '
								+ $scope.desc_model + ', '
								+ $scope.guests_model + ', '
								+ $scope.rooms_model + ', ' + $scope.beds_model
								+ ', ' + $scope.street_model + ', '
								+ $scope.apt_model + ', ' + $scope.city_model
								+ ', ' + $scope.state_model + ', '
								+ $scope.zip_model + ', '
								+ $scope.from_date_model + ', '
								+ $scope.to_date_model + ', '
								+ $scope.price_model + ', ' + $scope.week_price
								+ ', ' + $scope.month_price + ', '
								+ $scope.isbiddable_model + ', '
								+ $scope.lat_model + ', ' + $scope.long_model
								+ ', ' + imageFile1

						);

						if ($scope.title_model != undefined
								&& $scope.category_model != undefined
								&& $scope.desc_model != undefined
								&& $scope.guests_model != undefined
								&& $scope.rooms_model != undefined
								&& $scope.beds_model != undefined
								&& $scope.street_model != undefined
								&& $scope.apt_model != undefined
								&& $scope.city_model != undefined
								&& $scope.state_model != undefined
								&& $scope.zip_model != undefined
								&& $scope.from_date_model != undefined
								&& $scope.to_date_model != undefined
								&& $scope.price_model != undefined
								&& $scope.isbiddable_model != undefined
								&& $scope.week_price != undefined
								&& $scope.month_price != undefined
								&& $scope.lat_model != undefined
								&& $scope.long_model != undefined
								&& imageFile1 != undefined) {

							console.log("inside outer if of publishlisting");

							if (($scope.category_model == 'Entire Home'
									|| $scope.category_model == 'Private Room' || $scope.category_model == 'Shared Room')
									&& isNumber($scope.guests_model)
									&& isNumber($scope.rooms_model)
									&& isNumber($scope.beds_model)
									&& isNumber($scope.zip_model)
									&& isNumber($scope.price_model)
									&& (($scope.from_date_model < $scope.to_date_model) || ($scope.from_date_model == $scope.to_date_model))) { // inner
																								// if
								console
										.log("inside inner if of publishlisting");

								if ((noofimages) <= 15) { // inception if

									$http(
											{
												method : "POST",
												url : '/submitnewlisitng',
												data : {
													"title" : $scope.title_model,
													"category" : $scope.category_model,
													"desc" : $scope.desc_model,
													"guests" : $scope.guests_model,
													"rooms" : $scope.rooms_model,
													"beds" : $scope.beds_model,
													"street" : $scope.street_model,
													"apt" : $scope.apt_model,
													"city" : $scope.city_model,
													"state" : $scope.state_model,
													"zip" : $scope.zip_model,
													"lats" : $scope.lat_model,
													"longs" : $scope.long_model,
													"from_date" : $scope.from_date_model,
													"to_date" : $scope.to_date_model,
													"price" : $scope.price_model,
													"weekprice" : $scope.week_price,
													"monthprice" : $scope.month_price,
													"isbiddable" : $scope.isbiddable_model,
													"noofimages" : noofimages

												}
											})
											.success(
													function(data) {
														// checking the response
														// data for statusCode
														if (data.statusCode == 201) { // error
																						// case
															console
																	.log("some error while trying to create a new listing");
														} else if (data.statusCode == 200) {

															console
																	.log("successfully created new listing; redirecting to listings page");
															// property id
															// should be
															// returned here and
															// passed to
															// upload_images as
															// a parameter
															$scope
																	.upload_images(data.prop_id);
															// window.location.assign("/hostlistings");

														}
													}).error(function(error) {
												// $scope.unexpected_error =
												// true;
												// $scope.invalid_login = false;
											});

								} // inception if
								{
									$scope.incomplete_listing = false;
									$scope.invalid_entry = false;
									$scope.pictureno_limit = true;
								}

							} // inner if
							else {
								$scope.incomplete_listing = false;
								$scope.invalid_entry = true;
							}
						} // outer if
						else {
							$scope.incomplete_listing = true;
							// $scope.pictureno_limit=false;
						}

					};

					/* HOST ACCOUNT */
					$scope.deactivate_account = function() {
						console.log('invoked uploadvideo function');
						$scope.deactivateaccount = !($scope.deactivateaccount);
					};

					$scope.cancel_deactivation = function() {
						console.log("entered cancel_deactivation");
						window.location.assign("/hostaccount");
					};

					/*
					 * $scope.confirm_deactivation = function() {
					 * console.log("entered cancel_deactivation");
					 * window.location.assign("/hostaccount"); };
					 */

					$scope.confirm_deactivation = function(listing) {
						console.log("entered confirm_deactivation");
						var host_id = 0; // get host_id from the session
						// console.log ("listing.prop_id is " +
						// listing.prop_id);
						$http({
							method : "POST",
							url : '/deactivatehost',
							data : {
							// "host-id" : host_id
							}
						})
								.success(
										function(data) {
											// checking the response data for
											// statusCode
											if (data.statusCode == 300) {
												console
														.log("recieved 300 in delete listing");
												window.location.assign("/home"); // have
																					// to
																					// actually
																					// redirect
																					// to
																					// user
																					// homepage;
																					// no
																					// more
																					// host
																					// privileges
																					// for
																					// this
																					// user
											} else {
												console
														.log("dint recieeve 300; some error while deactivating host");
											}

										})
								.error(
										function(error) {
											console
													.log("some error in deactivation-angular file")
										});

					};

					/* HOST REQUESTS */
					$scope.getrequests = function() {
						console.log("entered getrequests");
						$http({
							method : "POST",
							url : '/getmyrequests',
							data : {

							}
						})
								.success(
										function(data) {
											// checking the response data for
											// statusCode
											if (data.statusCode == 200) {
												console
														.log("recieved 200 in getrequests");
												$scope.requestss = data.requests_list;
												console
														.log("$scope.requestss is "
																+ $scope.requestss);
												$scope.resultlength = data.results_length;
												$scope.norequests = false;
												$scope.yesrequests = true;
											} else {
												console.log("recieved 201");
												$scope.norequests = true;
												$scope.yesrequests = false;
												// put some default message when
												// no requests
											}

										})
								.error(
										function(error) {
											console
													.log("some error in homepage-angular file")
										});

					};

					$scope.getrequests();

					$scope.acceptuser = function(requests) {
						console.log("entered acceptrequest");
						// var host_id=0; // get host_id from the session
						// console.log ("listing.prop_id is " +
						// listing.prop_id);
						$http({
							method : "POST",
							url : '/acceptuser',
							data : {
								"propid" : requests.prop_id,
								"userid" : requests.user_id
							}
						})
								.success(
										function(data) {
											// checking the response data for
											// statusCode
											if (data.statusCode == 300) {
												console
														.log("recieved 300 in acceptrequest");
												window.location
														.assign("/hostrequests"); // have
																					// to
																					// actually
																					// redirect
																					// to
																					// user
																					// homepage;
																					// no
																					// more
																					// host
																					// privileges
																					// for
																					// this
																					// user
											} else {
												console
														.log("dint recieeve 300; some error acceptrequest");
											}

										}).error(function(error) {
									console.log("some error in acceptrequest")
								});

					};

					$scope.declineuser = function(requests) {
						console.log("entered declinerequest");
						// var host_id=0; // get host_id from the session
						// console.log ("listing.prop_id is " +
						// listing.prop_id);
						$http({
							method : "POST",
							url : '/declineuser',
							data : {
								"propid" : requests.prop_id,
								"userid" : requests.user_id
							}
						})
								.success(
										function(data) {
											// checking the response data for
											// statusCode
											if (data.statusCode == 300) {
												console
														.log("recieved 300 in declinerequest");
												window.location
														.assign("/hostrequests"); // have
																					// to
																					// actually
																					// redirect
																					// to
																					// user
																					// homepage;
																					// no
																					// more
																					// host
																					// privileges
																					// for
																					// this
																					// user
											} else {
												console
														.log("dint recieeve 300; some error declinerequest");
											}

										}).error(function(error) {
									console.log("some error in declinerequest")
								});

					};

					$scope.seereview = function(requests) {
						console.log("entered seereview");
						$scope.userreviews = !($scope.userreviews);
						$http({
							method : "POST",
							url : '/getthisuserreviews',
							data : {
								"userid" : requests.user_id
							}
						})
								.success(
										function(data) {
											// checking the response data for
											// statusCode
											if (data.statusCode == 200) {
												console
														.log("recieved 200 in seereview");
												$scope.reviews = data.reviews_list;
												console
														.log("$scope.requestss is "
																+ $scope.requestss);
												$scope.resultlength = data.results_length;
												$scope.yesreviews = true;
												$scope.noreviews = false;
											} else {
												console.log("recieved 201");
												$scope.yesreviews = false;
												$scope.noreviews = true;
												// put some default message when
												// no requests
											}

										})
								.error(
										function(error) {
											console
													.log("some error in seereview-angular file")
										});

					};

					/* HOST UPCOMING RESERVATIONS */
					$scope.getreservations = function() {
						console.log("entered getrequests");
						$http({
							method : "POST",
							url : '/getmyreservations',
							data : {

							}
						})
								.success(
										function(data) {
											// checking the response data for
											// statusCode
											if (data.statusCode == 200) {
												console
														.log("recieved 200 in getrequests");
												$scope.reservations = data.reservations_list;
												console
														.log("$scope.requestss is "
																+ $scope.requestss);
												$scope.resultlength = data.results_length;
												$scope.yesreservations = true;
												$scope.noreservations = false;
											} else {
												console.log("recieved 201");
												$scope.yesreservations = false;
												$scope.noreservations = true;
												// put some default message when
												// no requests
											}

										})
								.error(
										function(error) {
											console
													.log("some error in homepage-angular file")
										});

					};

					$scope.getreservations();

					/* COMPLETED RESERVATIONS */
					$scope.getcompletedreservations = function() {
						console.log("entered getrequests");
						$http({
							method : "POST",
							url : '/getcompletedreservations',
							data : {

							}
						})
								.success(
										function(data) {
											// checking the response data for
											// statusCode
											if (data.statusCode == 200) {
												console
														.log("recieved 200 in getrequests");
												$scope.creservations = data.creservations_list;
												console
														.log("$scope.requestss is "
																+ $scope.requestss);
												$scope.resultlength = data.results_length;
												$scope.yescreservations = true;
												$scope.nocreservations = false;
											} else {
												console.log("recieved 201");
												$scope.yescreservations = false;
												$scope.nocreservations = true;
												// put some default message when
												// no requests
											}

										})
								.error(
										function(error) {
											console
													.log("some error in homepage-angular file")
										});

					};

					$scope.getcompletedreservations();

					$scope.givereview = function() {
						console.log('invoked uploadvideo function');
						$scope.providereview = !($scope.providereview);
					};

					$scope.submitrating = function(reservation) {
						console.log("entered submitrating");
						var myreview = angular.element($('#please')).val();
						console.log("myreview  is " + myreview);
						console.log("$scope.rating_model  is "
								+ $scope.rating_model);

						// var host_id=0; // get host_id from the session
						// console.log ("listing.prop_id is " +
						// listing.prop_id);
						$http({
							method : "POST",
							url : '/submitrating',
							data : {
								"userid" : reservation.user_id,
								"propid" : reservation.prop_id,
								"review" : myreview,
								"rating" : $scope.rating_model,

							}
						})
								.success(
										function(data) {
											// checking the response data for
											// statusCode
											if (data.statusCode == 300) {
												console
														.log("recieved 300 in submitrating");
												window.location
														.assign("/hostintrovideo"); // have
																					// to
																					// do
																					// something
																					// else
											} else {
												console
														.log("dint recieeve 300; some error submitrating");
											}

										}).error(function(error) {
									console.log("some error in declinerequest")
								});

					};

					// ashna
					getProfilePicFileName();

					function getProfilePicFileName() {
						$http({
							method : "GET",
							url : '/getImageUrl'
						})
								.success(
										function(data) {
											// checking the response data for
											// statusCode
											if (data.statusCode == 200) {
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
					
					
					

						
					

					
					
					
					

				});
