angular.module('SearchCtrl', []).controller('SearchController', function($scope, $location, $rootScope, $timeout, $log, $http) {

	$scope.joshua = "Joshua";

	$scope.newGroup = {};

	$http.get("/api/groups/").success(function(res){
		$scope.groups = res;
		console.log(res);
	}).error(function(err){
		console.log(err);
	});

	$scope.createGroup = function(newGroup){

		$http.post("/api/group", newGroup).success(function(res){
			console.log($scope.groups);
			res.user = res.user._id
			$scope.groups.created.unshift(res);
			$scope.newGroup.title = "";
		}).error(function(err) {
			console.log(err);
		});
	}
 
});
