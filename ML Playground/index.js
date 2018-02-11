
var KNN = require("ml-knn");




//userPref holds recipe data that user rated
var userPref = [[0, 0, 0], [0, 1, 1], [1, 1, 0], [2, 2, 2], [1, 2, 2], [2, 1, 2]];
//userRatings hold what user rated the aformentioned recipes
var userRatings = ["Love it", "Love it","Love it", 1, 1, 1];
//knn is the ml model trained with userPref and userRatings
var knn = new KNN(userPref, userRatings);
//recipe data
var recipeData = [0, 0, 0];

//predictRating holds knn prediction of user's rating of the dish
var predictRating = knn.predict(recipeData);
console.log("Predition: "+predictRating)