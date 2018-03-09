
var KNN = require("ml-knn");


function predict(userData,userRatings,dishData) {
	var knn = new KNN(userPref, userRatings);
	return knn.predict(dishData);
}

function formatDishData(calories,servingSize,upvotes,steps,tags) {
	var dishData = [upvotes,parseInt(calories),parseInt(servingSize),steps.length];
	var tagOptions = ["Vegetarian","Vegan","Gluten-Free","Lactose-Free","Low Carb","Paleo"];
	for (var i = 0; i < tagOptions.length; i++) {
		if (tags.indexOf(tagOptions[i]) >= 0) {
			dishData.push(1);
		}
		else {
			dishData.push(0);
		}
	}


}

//userPref holds recipe data that user rated
var userPref = [[0, 0, 0], [0, 1, 1], [1, 1, 0], [2, 2, 2], [1, 2, 2], [2, 1, 2]];
//userRatings hold what user rated the aformentioned recipes
var userRatings = ["Love it", "Love it","Love it", "Hate it", "Hate it", "Hate it"];
//knn is the ml model trained with userPref and userRatings

var recipeData = [2,2,1];

console.log("Predition: "+predict(userPref,userRatings,recipeData))