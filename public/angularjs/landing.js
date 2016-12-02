var landing = angular.module('landing', []).controller('landingCtrl',
		[ '$scope', '$http', function($scope, $http) {

			$scope.yesNoResult = null;
			$scope.complexResult = null;
			$scope.customResult = null;
			$scope.invalid_login = true;
			$scope.val_mess = true;
			var fileInfo = "null";

			$scope.signup = function() {
				console.log("here");
				var lname = $scope.lname;
				var fname = $scope.fname;
				var email = $scope.email;
				var password = $scope.password;
				var phone = $scope.phone;
				var street = $scope.street;
				var apartment = $scope.apt;
				var city = $scope.city;
				var state = $scope.state;
				var zip = $scope.zip;
				var dob = $scope.month + "/" + $scope.day + "/" + $scope.year;

				$http({
					method : "POST",
					url : '/signup',
					data : {
						"fname" : fname,
						"lname" : lname,
						"email" : email,
						"password" : password,
						"dob" : dob,
						"phone" : phone,
						"street" : street,
						"apt" : apartment,
						"city" : city,
						"state" : state,
						"zip" : zip
					}
				}).success(function(data) {
					// checking the response data for statusCode
					if (data.statusCode == 200) {
						console.log("200");
						if (fileInfo != undefined || fileInfo != "null") {
							updatePhoto();
						}
						window.location.assign("/home");
					} else {
						$scope.error = "Please correct error";
						$scope.validlogin = true;
						$scope.invalid_login = false;
					}
					// Making a get call to the '/redirectToHomepage' API
					// window.location.assign("/homepage");
				}).error(function(error) {
					$scope.validlogin = true;
					$scope.invalid_login = true;
				});

			}

			$scope.login = function() {
				console.log("login");
				var email = $scope.email;
				var password = $scope.password;
				if (email == "" || email == null || email == undefined) {
					$scope.val_mess = false;
					$scope.message = "email is mandatory";
				} else if (email == "" || email == null || email == undefined) {
					$scope.val_mess = false;
					$scope.message = "email is mandatory";
				} else {
					$http({
						method : "POST",
						url : '/login',
						data : {
							"email" : email,
							"password" : password
						}
					}).success(function(data) {
						// checking the response data for statusCode
						if (data.statusCode == 200) {
							console.log("200");
							console.log(data);
							window.location.assign("/home");
						} else {
							$scope.error = "Username/password is incorrect";
							$scope.validlogin = true;
							$scope.invalid_login = false;
						}
						// Making a get call to the '/redirectToHomepage' API
						// window.location.assign("/homepage");
					}).error(function(error) {
						$scope.validlogin = true;
						$scope.invalid_login = true;
					});
				}
			}

			$scope.uploadFile = function(file) {
				console.log(file);
				fileInfo = file;

			};

			function updatePhoto() {

				var reqData = new FormData();
				reqData.append("image", fileInfo[0]);
				$http({
					method : 'POST',
					url : '/updatePhoto',
					data : reqData,
					headers : {
						'Content-Type' : undefined
					},
					transformRequest : angular.identity
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

			}
			;

		} ]);
