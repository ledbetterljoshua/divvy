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
		$http.get("/api/url?u="+newPost.url).success(function(resp){
			if (resp.constructor === Object) {
				resp = [resp];
			}
			resp = resp[0];
			var response = {};
			response.body = "This is some text about a thing";
			response.group = Group;
			console.log(resp);
			response.siteTitle = resp.siteTitle;
			response.siteDesc = resp.siteDesc;
			response.image = resp.image;
			response.url = resp.url;
			$http.post("/api/posts", response).success(function(res){
				console.log(res);
				console.log(response);
				$scope.posts.unshift(res);
			}).error(function(err) {
				console.log(err);
			});

		}).error(function(err) {
			console.log(err);
		});

	}

});
