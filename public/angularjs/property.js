var search = angular
		.module('property', [])
		.controller(
				'propertyCtrl',
				[
						'$scope',
						'$http',
						'$filter',
						function($scope, $http, $filter) {

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
							prop =JSON.parse(prop);
							console.log(prop);
							
							
							$scope.bid = function() {
								console.log("here");
								console.log($scope.bid_amt);
								$http({
									method : "POST",
									url : '/bid',
									data :{
										"bid_amt" : $scope.bid_amt,
										"prop_id" : $scope.property_prop_id
									}
								}).success(function(data) {
									// checking the response data for statusCode
									if (data.statusCode == 200) {
										console.log("made offer");

										
									} else {
										console.log("cannot make offer");
										
									}
									// Making a get call to the
									// '/redirectToHomepage' API
									// window.location.assign("/homepage");
								}).error(function(error) {
									$scope.validlogin = true;
									$scope.invalid_login = true;
								});
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
								})
										.success(
												function(data) {
													console
															.log("sent request to admin");
													window.location.assign("/home");
												})
										.error(
												function(error) {
													console
															.log("could not sent request to admin");
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
							    return Math.round(difference_ms/ONE_DAY)

							}
							
							function getHostProfilePicFileName() {
								$http({
									method : "POST",
									url : '/getHostImageUrl',
									data :{
										"user_id" :$scope.property.host_id
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
														console.log($scope.hostImageUrl);
													} else {

													}
													// Making a get call to the
													// '/redirectToHomepage' API
													// window.location.assign("/homepage");
												}).error(function(error) {

										});
							}

							
								$scope.viewPhotos = function(){
									console.log("vuew");
								}
							
						} ]);
