
var KNN = require("ml-knn");


function predict(userData,userRatings,dishData) {
	var knn = new KNN(userPref, userRatings);
	return knn.predict(dishData);
}
/*
//userPref holds recipe data that user rated
var userPref = [[0, 0, 0], [0, 1, 1], [1, 1, 0], [2, 2, 2], [1, 2, 2], [2, 1, 2]];
//userRatings hold what user rated the aformentioned recipes
var userRatings = ["Love it", "Love it", "Love it", "Hate it", "Hate it", "Hate it"];
//knn is the ml model trained with userPref and userRatings

var recipeData = [2,2,1];

console.log("Predition: "+predict(userPref,userRatings,recipeData))*/