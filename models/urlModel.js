var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var urlSchema = new Schema({
	url: String,
	image: String, 
	siteDesc: String,
	siteTitle: String,
	created_at: { type: Date, default: Date.now },
  updated_at: Date
});

urlSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();
  
  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at) {
    this.created_at = currentDate;
  }

  next();
});

var Urls = mongoose.model('Url', urlSchema);

module.exports = Urls;