var profile = angular.module('airbnb', []).controller('admin',
		[ '$scope', '$http', function($scope, $http) {

			getAdminProfile();
			getProfilePicFileName();
			$scope.uploadSucess = true;
			$scope.uploadFail = true;
			getAdminDashboard();
			function getAdminProfile() {
				$http({
					method : "POST",
					url : '/getAdminProfile'
				}).success(function(data) {
					// checking the response data for statusCode
					if (data.statusCode == 200) {
						console.log(data);
						$scope.admin = data.adminProfile;
					} else {
					}
				}).error(function(error) {
					$scope.validlogin = true;
					$scope.invalid_login = true;
				});
			}
			function getAdminDashboard() {
				$http({
					method : "GET",
					url : '/getAdminDashboard'
				}).success(function(data) {
					// checking the response data for statusCode
					if (data.statusCode == 200) {
						console.log(data);
						$scope.admin = data.adminProfile;
					} else {
					}
				}).error(function(error) {
					$scope.validlogin = true;
					$scope.invalid_login = true;
				});
			}
			$scope.updateAdminProfile = function() {
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
				if ($scope.address != undefined) {
					updates.address = $scope.address;
				}
				var data={};
				 data.updates=updates;
				console.log(updates);
				$http({
					method : "POST",
					url : '/updateAdminProfile',
					data : data
				}).success(function(data) {
					// checking the response data for statusCode
					if (data.statusCode == 200) {
						console.log("200");
						window.location.assign("/adminHome");
					} else {
					}
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
		                url: '/updateAdminPhoto',
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
					url : '/getAdminImageUrl'
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