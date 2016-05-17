// public/js/controllers/MainCtrl.js
angular.module('MainCtrl', []).controller('MainController', function($scope, $location, $rootScope, $timeout, $log, $http) {

	$scope.joshua = "Joshua";

	$scope.newGroup = {};

	$scope.createGroup = function(newGroup){

		$http.post("/api/group", newGroup).success(function(res){
			console.log(res);
		}).error(function(err) {
			console.log(err);
		});
	}
	$scope.createPost = function(newPost, group, text) {
		$http.get("/api/url?u="+newPost.url).success(function(res){
			var response = {};
			response.body = "This is some text about a thing";
			response.group = "573a01f11e9dc9f507a44ef1";
			response.siteTitle = res.title;
			response.siteDesc = res.desc;
			response.image = res.image;
			response.url = res.url;
			$http.post("/api/posts", response).success(function(res){
				console.log(res);
			}).error(function(err) {
				console.log(err);
			});

		}).error(function(err) {
			console.log(err);
		});

	}

	$http.get("/api/groups").success(function(res){
		$scope.groups = res;
		console.log(res);
	}).error(function(err){
		console.log(err);
	})

});
