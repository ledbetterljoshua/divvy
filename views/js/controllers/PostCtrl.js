// public/js/controllers/MainCtrl.js
angular.module('PostCtrl', []).controller('PostController', function($scope, $location, $routeParams, $rootScope, $timeout, $log, $http) {

	$http.get("/api/post/"+$routeParams.id).success(function(res){
		$scope.post = res.post;
		$scope.comments = res.comments;
		console.log(res);
	}).error(function(err){
		console.log(err);
	});
	var newComment = {};
	$scope.newComment;
	$scope.addComment = function(id, parentId, reply) {
		var newComment = {};
		$scope.newComment;
		newComment.post_id = id;
		if (parentId) {
			newComment.parent_id = parentId;
			newComment.body = reply;
		} else {
			newComment.body = $scope.newComment.body;
		}
		$http.post("/api/comment", newComment).success(function(res){
			console.log(res);
			$scope.comments.push(res);
		}).error(function(err) {
			console.log(err);
		});
	}

});
