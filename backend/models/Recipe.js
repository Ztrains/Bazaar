var mongoose = require('mongoose');

var RecipeSchema = new mongoose.Schema({
    name: String,
    description: String,
    ingredients: [{
    	name: String,
    	quantity: String
    }],
    steps: [{
    	step: String
    }],
    calories: String,
    servingSize: String,
    tags: [String],
    createdBy: String,
    videoId: String,
    upvotes: Number,
    comments: [{
        username: String,
        comment: String
    }],
    updatedAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Recipe', RecipeSchema);