var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    username: String,
    password: String, //not sure if needed cause google log in?
    email: String,
    updatedAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('User', UserSchema);