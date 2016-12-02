var account = angular.module('account', []).controller('accountCtrl',
		[ '$scope','$http', function($scope,$http) {

			$scope.sucess = true;
			$scope.fail = true;
			
			
			
			getProfilePicFileName();
			getProfile();
			
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

			
			  $scope.cancelAccount = function() {
				  console.log("here");
		            $http({
		                method: 'POST',
		                url: '/cancelAccount',

		                headers: {
		                    'Content-Type': undefined
		                },
		                transformRequest: angular.identity
		            }).success(function(data) {
						// checking the response data for statusCode
						if (data.statusCode == 200) {
							 window.location.assign("/");
							
						} else {

						}

					}).error(function(error) {

					});
		        
		    };
		    
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

		    
		    $scope.cancelAccount = function() {
				  console.log("here");
		            $http({
		                method: 'POST',
		                url: '/cancelAccount',

		                headers: {
		                    'Content-Type': undefined
		                },
		                transformRequest: angular.identity
		            }).success(function(data) {
						// checking the response data for statusCode
						if (data.statusCode == 200) {
							 window.location.assign("/");
							
						} else {

						}

					}).error(function(error) {

					});
		        
		    };

		    
		    $scope.updatePassword = function() {
		    	$scope.sucess = true;
				$scope.fail = true;
		    	console.log("here");
		    	console.log($scope.pwd1);
		    	var pwd = $scope.pwd1;
		    	var data ={};
		    	data.password=pwd;
		    	console.log(data);
				 if($scope.pwd1 != $scope.pwd2){
					 $scope.fail = false;
				 }
				 else{
					 $http({
			                method: 'POST',
			                url: '/updatePassword',
			                data:data
			            }).success(function(data) {
							// checking the response data for statusCode
							if (data.statusCode == 200) {
								console.log("200");
								$scope.sucess = false;
								
							} else {
								$scope.fail = false;
							}

						}).error(function(error) {

						});
				 }
		        
		    };

		} ]);
