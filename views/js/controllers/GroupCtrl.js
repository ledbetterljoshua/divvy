// public/js/controllers/MainCtrl.js
angular.module('GroupCtrl', []).controller('GroupController', function($scope, $location, $routeParams, $rootScope, $timeout, $log, $http) {

	$http.get("/api/group/"+$routeParams.id).success(function(res){
		$scope.group = res.group;
		$scope.posts = res.posts;
		console.log(res);
	}).error(function(err){
		console.log(err);
	});

	$scope.createPost = function(newPost, Group, text) {
		$http.get("/api/url?u="+newPost.url).success(function(res){
			var response = {};
			response.body = "This is some text about a thing";
			response.group = Group;
			response.siteTitle = res.title;
			response.siteDesc = res.desc;
			response.image = res.image;
			response.url = res.url;
			$http.post("/api/posts", response).success(function(res){
				console.log(res);
				$scope.posts.unshift(res);
			}).error(function(err) {
				console.log(err);
			});

		}).error(function(err) {
			console.log(err);
		});

	}

});
