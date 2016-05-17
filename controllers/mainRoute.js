// app/routes.js
module.exports = function(app) {

    app.get('/', isLoggedIn, function(req, res) {
        res.render('index.ejs', {
            user : req.user
        }); // load the index.ejs file
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/login');
}