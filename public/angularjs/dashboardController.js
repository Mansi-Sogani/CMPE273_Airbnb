angular.module('airbnb', []).controller('dashboardController',
		[ '$scope', '$http', function($scope, $http) {
			
			$scope.hostRequestList=function(){
				window.location.assign("/pendingRequest");
			};
						
		$scope.approveHost = function(user_id) {
			console.log("clicked on approve host");
			$http({
				method : "POST",
				url : '/approveHost',
				data : {
					"user_id":user_id
				}
			}).success(function(data) {
				if(data.status == 'Approved'){			
					window.location.assign("/pendingRequest");
				}
			}).error(function(error) {});
		};
		$scope.rejectHost = function(user_id) {
			console.log("clicked on reject host");
			$http({
				method : "POST",
				url : '/rejectHost',
				data : {
					"user_id":user_id
				}
			}).success(function(data) {
				if(data.status == 'Rejecteded'){			
					window.location.assign("/pendingRequest");
				}
			}).error(function(error) {});
		};
		
		$scope.searchBill=function(){
			window.location.assign("/searchBill");
		};
		
		
		$scope.searchhostby_old = function(){
			var state = document.getElementById("state").value;
			var city = document.getElementById("city").value;
			$http({
				method: "POST",
				url: '/searchHostByArea',
				data: {
					"state":state,
					"city":city
				}
			}).success(function(data){
				
			}).error(function(error){
				
			})
		}
				
		}]);
