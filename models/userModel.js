var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt   = require('bcrypt-nodejs');

// create a schema
var userSchema = new Schema({
  username: String,
  local: {
    email   : String,
    password: String,
  },
  admin: Boolean,
  location: String,
  meta: {
    age: Number,
    image: String
  },
  created_at: { type: Date, default: Date.now },
  updated_at: Date
}); 

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);