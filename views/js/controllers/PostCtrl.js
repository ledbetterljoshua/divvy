// public/js/controllers/MainCtrl.js
angular.module('PostCtrl', []).controller('PostController', function($scope, $location, $routeParams, $rootScope, $timeout, $log, $http) {

	$http.get("/api/post/"+$routeParams.id).success(function(res){
		$scope.post = res.post;
		$scope.comments = res.comments;
		console.log(res);
	}).error(function(err){
		console.log(err);
	});

	$scope.addComment = function(id) {
		var newComment = {};
		$scope.newComment;
		newComment.post_id = id;
		newComment.body = $scope.newComment.body;

		$http.post("/api/comment", newComment).success(function(res){
			console.log(res);
			$scope.comments.push(res);
		}).error(function(err) {
			console.log(err);
		});
	}
	$scope.addReply = function(comment_id, text, index) {
		console.log($scope.comments[index])
		var newReply = {};
		newReply.reply = {};
		$scope.newReply;

		newReply.id = comment_id;
		newReply.reply.text = text;

		$http.post("/api/comment/reply", newReply).success(function(res){
			console.log(res);
			$scope.comments[index].replies.push(res[res.length-1]);
		}).error(function(err) {
			console.log(err);
		});
	}

});
