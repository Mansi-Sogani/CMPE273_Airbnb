angular.module('airbnb', []).controller('adminLoginController',
		[ '$scope','$http', function($scope,$http) {
			$scope.invalid_login = true;
			$scope.login = function() {		
				var email = $scope.email;
				var password = $scope.password;			
				$http({
					method : "POST",
					url : '/adminLogin',
					data : {
						"email" : email,
						"password" : password
					}
				}).success(function(data) {
					// checking the response data for statusCode
					if (data.statusCode == 200) {
						console.log("200");
						console.log(data);
						 window.location.assign("/adminHome"); 
					} else {
						 $scope.error="Username/password is incorrect";
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
		} ]);