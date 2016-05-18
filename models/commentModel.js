var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var Post = require('./postModel.js')

var commentSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    post_id: {type: Schema.Types.ObjectId, ref: 'Post'},
    replies: [
        { posted: { type: Date, default: Date.now },
          author: {type: Schema.Types.ObjectId, ref: 'User'},
          text: String
        }],
    body: String,
	  created_at: { type: Date, default: Date.now },
  	updated_at: Date
});

commentSchema.pre('save', function(next) {
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

var Comments = mongoose.model('Comments', commentSchema);

module.exports = Comments;