var Posts = require('../../models/postModel');
var Comments = require('../../models/commentModel');

module.exports = function(app, router, bodyParser) {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    
    //get all comments on post
    
    router.post('/comment', isAuthenticated, function(req, res) {

        if (req.body.id) {
            Comments.findByIdAndUpdate(req.body.id, { 
            	body: req.body.body, 
              updated_at: req.body.updated_at 
            }, 
            function(err, post) {
                if (err) {res.send(err)};
                res.send('Success');
            });
        }
        
        else {
           var newComment = Comments({
              user: req.user, 
              body: req.body.body, 
              post_id: req.body.post_id,
              parent_id: req.body.parent_id,
              created_at: req.body.created_at,
              updated_at: req.body.updated_at
           });
           newComment.save(function(err) {
               if (err) {res.send(err)};
               res.send(newComment);
           });
           Posts.findByIdAndUpdate(req.body.post_id, { 
            $inc: { comments: 1, popularity: 1 }
            }, 
            function(err, post) {
                if (err) {res.send(err)};
            });
            
        }
        
    });
    
    router.delete('/comment/:id', isAuthenticated, function(req, res) {
        
        Comments.findByIdAndRemove(req.params.id, function(err) {
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