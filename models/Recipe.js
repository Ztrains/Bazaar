var mongoose = require('mongoose');

var RecipeSchema = new mongoose.Schema({
    name: String,
    description: String,
    ingredients: [Object],
    steps: [Object],
    calories: String,
    servingSize: String,
    tags: [String],
    createdBy: String,
    updatedAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Recipe', RecipeSchema);