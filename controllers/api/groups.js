var Groups = require('../../models/groupModel');
var Posts = require('../../models/postModel');

module.exports = function(app, router, bodyParser) {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
 
    //get trending groups
    router.get('/groups/trending', function(req, res){
      Groups.find( { 
      private: false, popularity: { $lt: req.query.lessThan } })
      .limit(req.query.limit)
      .sort('-popularity')
      .exec(function (err, groups) {
        // do something with the array of posts
        res.send(groups);
      });
    })

    //get all posts by a user
    router.get('/user/:uname/groups', function(req, res) {
        
        Groups.find({ user: req.params.uname, 
        private: false, created_at: { $gt: req.query.createdAtBefore } })
        .limit(req.query.limit)
        .sort( '-created_at' )
        .exec(function(err, groups) {
            if (err) {res.send(err)};
            
            res.send(groups);
        });
        
    });
    
    //get all of the current users groups he is apart of
    router.get('/groups/added-to', isAuthenticated, function(req, res) {
       Groups.find({ users: req.user._id, created_at: { $gt: req.query.createdAtBefore } })
          .limit(req.query.limit)
          .exec(function(err, groups) {
          if(err) res.send(err); 
          console.log(req.user)
          res.send(groups); 
       });
    });
    //get all of the current users personally created groups
    router.get('/groups/created', isAuthenticated, function(req, res) {
       Groups.find({ user: req.user._id, created_at: { $gt: req.query.createdAtBefore } })
          .limit(req.query.limit)
          .exec(function(err, groups) {
          if(err) res.send(err); 
          console.log(req.user)
          res.send(groups); 
       });
    });
    //get all of the current users groups, created and added
    router.get('/groups', isAuthenticated, function(req, res) {
      var response = {}
       Groups.find({ user: req.user._id, created_at: { $gt: req.query.createdAtBefore } })
          .limit(req.query.limit)
          .exec(function(err, groups) {
          if(err) res.send(err); 
          response.created = groups;
          Groups.find({ users: req.user._id, created_at: { $gt: req.query.createdAtBefore } })
            .limit(req.query.limit)
            .exec(function(err, groupss) {
              if(err) res.send(err); 
              response.addedTo = groupss;
              res.send(response); 
           });
       });
    });

    //get a single group with all of its posts
    router.get('/group/:id', function(req, res) {
       var response = {}
       Groups.findById({ _id: req.params.id }, function(err, groups) {
          response.group = groups;
          Posts.find({ group: req.params.id })
          .sort( '-created_at' )
          .exec(function(error, posts) {
              response.posts = posts;
              res.send(response); 
          });
       });
        
    });

    //add somone to a group
    router.post('/group/:id/share', isAuthenticated, function(req, res) {
      if(req.body.addedUser) {
        Groups.findByIdAndUpdate(
            req.params.id,
            {$push: {"users": {user: req.body.addedUser}}},
            function(err, post) {
                if (err) res.send(err);
                res.send('Success');
            }
        );
      } else if(req.body.addedMultiUser) {
        Groups.findByIdAndUpdate(
            req.params.id,
            {$pushAll: {"users": {user: req.body.addedMultiUser}}},
            function(err, post) {
                if (err) res.send(err);
                res.send('Success');
            }
        );
      } else {
        res.send('please try again')
      }
    });
    
    router.post('/group', isAuthenticated, function(req, res) {

        if (req.body.id) {
            Groups.findByIdAndUpdate(req.body.id, { 
            	user: req.user, 
            	users: req.body.addedUser, 
            	popularity: req.body.popularity,
              title: req.body.title,
              slug: req.body.slug,
              private: req.body.private,
              created_at: req.body.created_at,
              updated_at: req.body.updated_at 
            }, {new: true},
            function(err, post) {
                if (err) {res.send(err)};
                res.send(post);
            });
        }
        
        else {
           var newGroup = Groups({
              user: req.user, 
              users: req.body.addedUser, 
              popularity: req.body.popularity,
              title: req.body.title,
              slug: req.body.slug,
              private: req.body.private,
              created_at: req.body.created_at,
              updated_at: req.body.updated_at 
           });
           newGroup.save(function(err) {
               if (err) {res.send(err)};
               res.send(newGroup);
           });
            
        }
        
    });
    
    router.delete('/group/:id', isAuthenticated, function(req, res) {
        
        Groups.findByIdAndRemove(req.params.id, function(err) {
            if (err) {res.send(err)};
            res.send('Success');
        })
        
    });
    
}
// route middleware to make sure a user is logged in
function isAuthenticated(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}