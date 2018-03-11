
var KNN = require("ml-knn");


function predict(userData,userRatings,dishData) {
	if (userData.length === 0 || userRatings.length === 0 || dishData.length === 0) {
		return "Possibly Enjoy";
	}
	var knn = new KNN(userData, userRatings);
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

	return dishData;
}

console.log(formatDishData("20", "30", 1223, ["a","b"], ["Vegetarian"]));

module.exports = {
	predict: predict,
	formatDishData: formatDishData
}