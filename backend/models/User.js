var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	name: String,
    username: String,
    //password: String, //not sure if needed cause google log in?
    email: String,
    //emailPrefs: {type: String, default: 'weekly'},
    contact: {
        method: {
            type: String, 
            default: 'email',
            enum: ['email', 'text']
        },
        frequency: {
            type: Number, 
            default: 7,
            min: 1,
            max: 7
        }
    },
    updatedAt: {type: Date, default: Date.now},
    googleId: String,
    savedRecipes: [{
        recipeID: String,
        recipeName: String,
        recipeDescription: String,
    }],
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
    calendar: {
        sunday: {
            breakfast: {
                id: String,
                name: String,
                calorieCount: Number
            },
            lunch: {
                id: String,
                name: String,
                calorieCount: Number
            },
            dinner: {
                id: String,
                name: String,
                calorieCount: Number
            }
        },
        monday: {
            breakfast: {
                id: String,
                name: String,
                calorieCount: Number
            },
            lunch: {
                id: String,
                name: String,
                calorieCount: Number
            },
            dinner: {
                id: String,
                name: String,
                calorieCount: Number
            }
        },
        tuesday: {
            breakfast: {
                id: String,
                name: String,
                calorieCount: Number
            },
            lunch: {
                id: String,
                name: String,
                calorieCount: Number
            },
            dinner: {
                id: String,
                name: String,
                calorieCount: Number
            }
        },
        wednesday: {
            breakfast: {
                id: String,
                name: String,
                calorieCount: Number
            },
            lunch: {
                id: String,
                name: String,
                calorieCount: Number
            },
            dinner: {
                id: String,
                name: String,
                calorieCount: Number
            }
        },
        thursday: {
            breakfast: {
                id: String,
                name: String,
                calorieCount: Number
            },
            lunch: {
                id: String,
                name: String,
                calorieCount: Number
            },
            dinner: {
                id: String,
                name: String,
                calorieCount: Number
            }
        },
        friday: {
            breakfast: {
                id: String,
                name: String,
                calorieCount: Number
            },
            lunch: {
                id: String,
                name: String,
                calorieCount: Number
            },
            dinner: {
                id: String,
                name: String,
                calorieCount: Number
            }
        },
        saturday: {
            breakfast: {
                id: String,
                name: String,
                calorieCount: Number
            },
            lunch: {
                id: String,
                name: String,
                calorieCount: Number
            },
            dinner: {
                id: String,
                name: String,
                calorieCount: Number
            }
        }
    }
});

module.exports = mongoose.model('User', UserSchema);