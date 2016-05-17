var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var groupSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    users: { type : Array , "default" : [] }, 
    popularity: {type : Number , "default" : 0},
    posts: {type : Number , "default" : 0},
    title: String,
    slug: String,
    private: Boolean,
    created_at: { type: Date, default: Date.now },
    updated_at: Date, 
});

groupSchema.pre('save', function(next) {
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

var Groups = mongoose.model('Groups', groupSchema);


module.exports = Groups;