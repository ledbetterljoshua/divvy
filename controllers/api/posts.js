var Posts = require('../../models/postModel');
var Groups = require('../../models/groupModel');
var Comments = require('../../models/commentModel');

module.exports = function(app, router, bodyParser) {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    //get trending posts
    router.get('/posts/trending', function(req, res) {
        Posts.find( { 
          private: false, popularity: { $lte: req.query.lessThan } })
          .limit(req.query.limit)
          .sort('-popularity')
          .exec(function (err, posts) {
            // do something with the array of posts
            res.send(posts);
          });
    });

    //**********TODO**********
    //allow user to save a post by favoriting 

    //allow user to save a post by clicking readlater

    //get all posts by a user
    router.get('/user/:uname/posts', function(req, res) {

        Posts.find({
            user: req.params.uname, created_at: { $gt: req.query.createdAtBefore }
          })
          .limit(req.query.limit)
          .exec(function(err, posts) {
                if (err) {
                    res.send(err)
                };

                res.send(posts);
            });

    });

    //get all posts within a group
    router.get('/groups/:group/posts', function(req, res) {

        Posts.find({
            group: req.params.group, created_at: { $gt: req.query.createdAtBefore }
        })
          .limit(req.query.limit)
          .exec(function(err, posts) {
            if (err) {
                res.send(err)
            };

            res.send(posts);
        });

    });

    //get all posts for a user
    router.get('/posts', isAuthenticated, function(req, res) {

        Posts.find({
            user: req.user
        }).exec(function(err, post) {
            if (err) {
                res.send(err)
            };

            res.send(post);
        });

    });

    //get a single post
    router.get('/post/:id', function(req, res) {
        var Response = {};
        Posts.findById({
            _id: req.params.id
        }, function(err, post) {
            if (err) {
                res.send(err)
            };
            Response.post = post;
            Comments.find({
                post_id: req.params.id, 
                created_at: { $gt: req.query.createdAtBefore }
            })
            .limit(req.query.limit)
            .exec(function(err, comments) {
                    if (err) {
                        res.send(err)
                    };
                    Response.comments = comments;
                    res.send(Response);
                });
        });

    });

    router.post('/posts', isAuthenticated, function(req, res) {

        Groups.findById({
            _id: req.body.group
        }, function(err, groups) {
            var response = {};
            response.group = groups;
            console.log("req");
            console.log(req.body);
            var ex = function(priv) {
                if (req.body.id) {
                    Posts.findByIdAndUpdate(req.body.id, {
                            user: req.user,
                            body: req.body.body,
                            url: req.body.url,
                            slug: req.body.slug,
                            siteDesc: req.body.siteDesc,
                            siteTitle: req.body.siteTitle,
                            image: req.body.image,
                            group: req.body.group,
                            private: priv,
                            created_at: req.body.created_at,
                            updated_at: req.body.updated_at
                        },
                        function(err, post) {
                            if (err) {
                                res.send(err)
                            };
                            res.send('Success');
                        });
                } else {
                    var newPost = Posts({
                        user: req.user,
                        body: req.body.body,
                        url: req.body.url,
                        slug: req.body.slug,
                        siteDesc: req.body.siteDesc,
                        siteTitle: req.body.siteTitle,
                        image: req.body.image,
                        group: req.body.group,
                        private: priv,
                        created_at: req.body.created_at,
                        updated_at: req.body.updated_at
                    });
                    newPost.save(function(err) {
                        if (err) {
                            res.send(err)
                        };
                        res.send(newPost);
                    });

                }
            }
            console.log("response.group");
            console.log(response.group);
            console.log("groups");
            console.log(groups);
            console.log( "req.body.group")
            console.log( req.body.group)
            if (response.group.private) {
                ex(true);
            } else {
                ex(false);
            }
        });

    });

    router.delete('/post/:id', isAuthenticated, function(req, res) {

        Posts.findByIdAndRemove(req.params.id, function(err) {
            if (err) {
                res.send(err)
            };
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