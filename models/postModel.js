var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var postSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    body: String,
    url: String,
    slug: String,
    popularity: {type : Number , "default" : 0},
    siteDesc: String,
    siteTitle: String, 
    image: String,
    popularity: {type : Number , "default" : 0},
    comments: {type : Number , "default" : 0},
    group: {type: Schema.Types.ObjectId, ref: 'Group'},
    private: Boolean,
	created_at: { type: Date, default: Date.now },
  	updated_at: Date
});

var Posts = mongoose.model('Posts', postSchema);

//Before saving to the database, 
//check url database to see if current root url is in the database
	//if it is in the database
		//pull the data and save it to our model
	//else 
		//crawl the site 
		//save the data to our url database
		//save the data to our model being saved

module.exports = Posts;