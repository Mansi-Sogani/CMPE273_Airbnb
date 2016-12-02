var search = angular
		.module('search', [])
		.controller(
				'searchCtrl',
				[
						'$scope',
						'$http',
						'$filter',
						function($scope, $http, $filter) {

							// getSession();
							getProfilePicFileName();
							getProfile();

//				        	$rootScope.searchDetails = $cookieStore.get('searchDetails');
//				        	$scope.searchResults = $cookieStore.get('searchResults');
							//console.log($rootScope);
				        	//console.log($rootScope.searchDetails);
				        	//console.log(searchResults);
							
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

				        	
							$scope.searchProperty = function() {
								console.log("search");
								console.log($scope.destination);
								if ($scope.checkIn == undefined) $scope.checkIn = new Date();
								if ($scope.checkOut == undefined) $scope.checkIn = new Date();

								var checkIn = $filter('date')($scope.checkIn,
										"yyyy-MM-dd");
								var checkOut = $filter('date')($scope.checkOut,
										"yyyy-MM-dd");
								console.log(checkIn);
								console.log(checkOut);
								console.log($scope.guests);
								console.log($scope.priceTo);
								console.log($scope.priceFrom);
								console.log($scope.home);
								console.log($scope.private);
								console.log($scope.shared);
								var url = "/search?dest=" + $scope.destination + "&checkIn=" + checkIn + "&checkOut=" + checkOut + "&guests=" + $scope.guests
								+ "&priceTo=" + $scope.priceTo + "&priceFrom=" + $scope.priceFrom + "&home=" + $scope.home +  "&private=" + $scope.private+ "&shared="+ $scope.shared;
								
								console.log(url);
							window.location.assign(url);

							}

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
									// Making a get call to the '/redirectToHomepage' API
									// window.location.assign("/homepage");
								}).error(function(error) {
									$scope.validlogin = true;
									$scope.invalid_login = true;
								});
							}

						} ]);
