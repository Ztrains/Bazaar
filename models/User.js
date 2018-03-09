var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	name: String,
    username: String,
    //password: String, //not sure if needed cause google log in?
    email: String,
    updatedAt: {type: Date, default: Date.now},
    googleId: String,
    savedRecipes: [Number],
    mlDishData: [[Number]],
    mlDishRatings: [String],
    preferences: [String],
    token: String,
    imageUrl: String,
    dishPrefs: [String],
    phoneNumber: String,
    shoppingList: [{
    	quantity: String,
    	name: String
    }],
    calendar: [{
        breakfast: String,
        lunch: String,
        dinner: String
    }]
});

module.exports = mongoose.model('User', UserSchema);