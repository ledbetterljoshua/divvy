var Posts = require('../../models/postModel');
var Groups = require('../../models/groupModel');
var Users = require('../../models/userModel');

module.exports = function(app, router, bodyParser) {
	app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    //search
    router.get('/search', function(req, res) {
    	if (req.user) {

    		Groups.find(
		        { $text : { $search : req.query.all }, 
		        private: false, user: {$ne: req.user._id } }, 
		        { score : { $meta: "textScore" } }
		    )
		    .limit(req.query.limit)
          	.skip(req.query.skip)
		    .sort({ score : { $meta : 'textScore' } })
		    .exec(function(err, otherGroupResults) {

		    	//create empty object. 
		    	//For each result we get, add it to the object
		    	var results = {};
		    	results.otherGroups = otherGroupResults;
		        Posts.find(
			        { $text : { $search : req.query.all }, 
			        private: false, user: {$ne: req.user._id } }, 
			        { score : { $meta: "textScore" } }
			    )
			    .limit(req.query.limit)
      			.skip(req.query.skip)
			    .sort({ score : { $meta : 'textScore' } })
			    .exec(function(err, otherPostResults) {
			    	results.otherPosts = otherPostResults;
			        Users.find(
				        { $text : { $search : req.query.all } }, 
				        { score : { $meta: "textScore" } }
				    )
				    .limit(req.query.limit)
          			.skip(req.query.skip)
				    .sort({ score : { $meta : 'textScore' } })
				    .exec(function(err, userResults) {
				    	results.users = userResults;
				        Groups.find(
					        { $text : { $search : req.query.all }, 
					        user: req.user._id }, 
					        { score : { $meta: "textScore" } }
					    )
					    .limit(req.query.limit)
          				.skip(req.query.skip)
					    .sort({ score : { $meta : 'textScore' } })
					    .exec(function(err, myGroupResults) {
					    	results.myGroups = myGroupResults;
					        Posts.find(
						        { $text : { $search : req.query.all }, 
						        user: req.user._id }, 
						        { score : { $meta: "textScore" } }
						    )
						    .limit(req.query.limit).skip(req.query.skip)
						    .sort({ score : { $meta : 'textScore' } })
						    .exec(function(err, myPostResults) {
						    	results.myPosts = myPostResults;
						        res.send(results);
						    });
					    });
				    });
			    });
		    });

    	} else {
    		Groups.find(
		        { $text : { $search : req.query.all }, 
		        private: false }, 
		        { score : { $meta: "textScore" } }
		    )
		    .limit(req.query.limit).skip(req.query.skip)
		    .sort({ score : { $meta : 'textScore' } })
		    .exec(function(err, groupResults) {
		    	var results = {};
		    	results.groups = groupResults;
		        Posts.find(
			        { $text : { $search : req.query.all }, 
			        private: false }, 
			        { score : { $meta: "textScore" } }
			    )
			    .sort({ score : { $meta : 'textScore' } })
			    .limit(req.query.limit).skip(req.query.skip)
			    .exec(function(err, postResults) {
			    	results.posts = postResults;
			        Users.find(
				        { $text : { $search : req.query.all }, 
				        private: false }, 
				        { score : { $meta: "textScore" } }
				    )
				    .limit(req.query.limit).skip(req.query.skip)
				    .sort({ score : { $meta : 'textScore' } })
				    .exec(function(err, userResults) {
				    	results.users = userResults;
				        res.send(results);
				    });
			    });
		    });
    	}

    });
}