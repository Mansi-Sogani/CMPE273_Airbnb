var profile = angular.module('profile', []).controller('profileCtrl',
		[ '$scope', '$http', function($scope, $http) {

			getProfile();
			getProfilePicFileName();
			$scope.uploadSucess = true;
			$scope.uploadFail = true;
			

			
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


			$scope.updateProf = function() {
				console.log(" update");
				var updates = {};
				if ($scope.fname != undefined || $scope.fname != "") {
					updates.fname = $scope.fname;
				}
				if ($scope.lname != undefined) {
					updates.lname = $scope.lname;
				}
				if ($scope.email != undefined) {
					updates.email = $scope.email;
				}
				if ($scope.phone_no != undefined) {
					updates.phone_no = $scope.phone_no;
				}
				if ($scope.birthday != undefined) {
					updates.birthday = $scope.birthday;
				}
				if ($scope.street != undefined) {
					updates.street = $scope.street;
				}
				if ($scope.apartment != undefined) {
					updates.apartment = $scope.apartment;
				}
				if ($scope.city != undefined) {
					updates.city = $scope.city;
				}
				if ($scope.state != undefined) {
					updates.state = $scope.state;
				}
				if ($scope.zip_code != undefined) {
					updates.zip_code = $scope.zip_code;
				}
				var data={};
				 data.updates=updates;
				console.log(updates);
				$http({
					method : "POST",
					url : '/updateProf',
					data : data
				}).success(function(data) {
					// checking the response data for statusCode
					if (data.statusCode == 200) {
						console.log("200");
						window.location.assign('/profile');
						
					} else {
						
					}
					// Making a get call to the '/redirectToHomepage' API
					// window.location.assign("/homepage");
				}).error(function(error) {
					$scope.validlogin = true;
					$scope.invalid_login = true;
				});

			}
			
			$scope.uploadFile = function(file) {
		        console.log(file);
		        fileInfo = file;
		    };
		    
		    $scope.updatePhoto = function() {
		    	console.log(fileInfo);
		
		            var reqData = new FormData();
		            reqData.append("image", fileInfo[0]);
		            console.log(reqData);
		            $http({
		                method: 'POST',
		                url: '/updatePhoto',
		                data: reqData,
		                headers: {
		                    'Content-Type': undefined
		                },
		                transformRequest: angular.identity
		            }).success(function(data) {
						// checking the response data for statusCode
						if (data.statusCode == 200) {
							console.log("200");
							
							$scope.uploadSucess = false;
							getProfilePicFileName();
							
						} else {
							$scope.uploadFail = false;
						}
						// Making a get call to the '/redirectToHomepage' API
						// window.location.assign("/homepage");
					}).error(function(error) {
						$scope.validlogin = true;
						$scope.invalid_login = true;
					});
		        
		    };
		    
		    function getProfilePicFileName() {
				$http({
					method : "GET",
					url : '/getImageUrl'
				}).success(function(data) {
					// checking the response data for statusCode
					if (data.statusCode == 200) {
						console.log(data);
						$scope.imageUrl="http://localhost:3001/getImageByUrl?profile_pic=" + data.url;
						
					} else {

					}
					// Making a get call to the '/redirectToHomepage' API
					// window.location.assign("/homepage");
				}).error(function(error) {
					
				});
			}

		} ]);
