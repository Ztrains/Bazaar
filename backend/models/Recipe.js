var mongoose = require('mongoose');

var RecipeSchema = new mongoose.Schema({
    name: String,
    ingredients: [String], //not sure if needed cause google log in?
    updatedAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Recipe', RecipeSchema);