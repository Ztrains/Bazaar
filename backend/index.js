require('dotenv').load();
const app 		= require("express")();
const passport		= require("passport");
const GoogleStrat	= require("passport-google-oauth20").Strategy;
const bodyParser 	= require("body-parser");
const mongoose 		= require('mongoose');
const fs 		= require("fs");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const cors		= require("cors");
const nodemailer = require('nodemailer');
const CronJob = require('cron').CronJob;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

app.use(cookieSession({
	name: "bazaar-session",
	keys: [process.env.COOKIE_KEY],
	maxAge: 24 * 60 * 60 * 1000
}));
app.use(cookieParser());

var corsOpts = {
	origin: true,
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
	credentials: true
}
app.use(cors(corsOpts));

let raw_recipes = fs.readFileSync("recipes.json");
let parsed_recipes = JSON.parse(raw_recipes);

/***** Start of db code *******/
// console.log('DB USERNAME: ', process.env.DB_USER)
let mongoDB = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ds125048.mlab.com:25048/bazaar`;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise; // not sure we need promises yet
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var User = require('./models/User');
var Recipe = require('./models/Recipe');
var ml = require('./ml');
var scraper = require('./video');
/******************************/

passport.use(new GoogleStrat({
	clientID: process.env.CLIENT_ID,
	clientSecret: process.env.CLIENT_SEC,
	callbackURL: "https://bazaar-408.herokuapp.com/auth/google/callback"
},
	(accessToken, refreshToken, profile, callback) => {
		User.findOne({
			googleId: profile.id
		}, (err, user) => {
			if (err) {
				return res.status(500).json({message: "Internal server error"});
			}

			// console.log("ACCESS TOKEN: " + accessToken, " REFRESH TOKEN: ", refreshToken);
			if (!user) {
				// register user
				user = new User({
					name: profile.name.givenName + " " + profile.name.familyName,
					email: profile.emails[0].value,
					username: profile.emails[0].value,
					googleId: profile.id,
					token: accessToken
				});

				user.save((err) => {
					if (err) {
						console.log(err);
					}
					return callback(err, user);
				});
			} else {
				// we found the user, so update the db with new access token and return
				User.findOneAndUpdate({googleId: profile.id}, {$set: {token: accessToken}}, {new: true}, (err, user) => {
					if (err) {
						return res.status(500).json({message: "Internal server error"});
					}
					if (!user) {
						return res.status(400).json({message: "User not found 1"});
					}

					return callback(err, user);
				});
			}
		});
	}
));

passport.serializeUser((user, callback) => {
	callback(null, user);
});

passport.deserializeUser((obj, callback) => {
	callback(null, obj);
});


// app.all('/*', (req, res, next) => {
//     //console.log(req)
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

app.get("/", (req, res) => {
	if (req.session.token) {
		res.cookie('token', req.session.token);
		return res.json("Welcome to Bazaar! You're logged in!");
	} else {
		res.cookie('token', '');
		return res.json("Welcome to Bazaar! Please log in.");
	}
});

app.get("/auth/google", passport.authenticate("google", { scope: ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/plus.profile.emails.read']}));
app.get("/auth/google/callback", passport.authenticate("google", { failureRedirect: "/auth/signup" }),
	(req, res) => {
		req.session.token = req.user.token;
		res.redirect("/");
});

app.post("/auth/signup", (req, res) => {
	if (!req.body.username) {
		return res.status(400).json({message: "Missing username"});
	}
	if (!req.body.accessToken) {
		return res.status(400).json({message: "Missing access token"});
	}
	if (!req.body.userObj) {
		return res.status(400).json({message: "Missing user object"});
	}
	
	User.findOne({username: req.body.username, email: req.body.userObj.email}, (err, user) => {
		if (err) {
			return res.status(500).json({message: "Internal server error"});
		}

		if (!user) {
			var data = {
				name: req.body.userObj.givenName + " " + req.body.userObj.familyName,
				username: req.body.username,
				email: req.body.userObj.email,
				googleId: req.body.userObj.googleId,
				imageUrl: req.body.userObj.imageUrl,
				token: req.body.accessToken,
				votedRecipes: [],
				calendar: {
					sunday: {
						breakfast: {
							id: "",
							name: "",
							calorieCount: ""
						},
						lunch: {
							id: "",
							name: "",
							calorieCount: ""
						},
						dinner: {
							id: "",
							name: "",
							calorieCount: ""
						}
					},
					monday: {
						breakfast: {
							id: "",
							name: "",
							calorieCount: ""
						},
						lunch: {
							id: "",
							name: "",
							calorieCount: ""
						},
						dinner: {
							id: "",
							name: "",
							calorieCount: ""
						}
					},
					tuesday: {
						breakfast: {
							id: "",
							name: "",
							calorieCount: ""
						},
						lunch: {
							id: "",
							name: "",
							calorieCount: ""
						},
						dinner: {
							id: "",
							name: "",
							calorieCount: ""
						}
					},
					wednesday: {
						breakfast: {
							id: "",
							name: "",
							calorieCount: ""
						},
						lunch: {
							id: "",
							name: "",
							calorieCount: ""
						},
						dinner: {
							id: "",
							name: "",
							calorieCount: ""
						}
					},
					thursday: {
						breakfast: {
							id: "",
							name: "",
							calorieCount: ""
						},
						lunch: {
							id: "",
							name: "",
							calorieCount: ""
						},
						dinner: {
							id: "",
							name: "",
							calorieCount: ""
						}
					},
					friday: {
						breakfast: {
							id: "1",
							name: "Eggs and Toast",
							calorieCount: "500"
						},
						lunch: {
							id: "2",
							name: "Tomato Soup",
							calorieCount: "1000"
						},
						dinner: {
							id: "3",
							name: "Orange Chicken",
							calorieCount: "50000"
						}
					},
					saturday: {
						breakfast: {
							id: "",
							name: "",
							calorieCount: ""
						},
						lunch: {
							id: "",
							name: "",
							calorieCount: ""
						},
						dinner: {
							id: "",
							name: "",
							calorieCount: ""
						}
					}
				}
			};

			User.create(data, (err, newUser) => {
				if (err) {
					return res.status(500).json({message: "Internal server error"});
				}

				console.log("New user created: " + newUser);
				return res.status(200).json({message: "Success", user: newUser});
			});
		} else {
			return res.status(400).json({message: "User already exists"});
		}
	});
});

app.post("/auth/signin", (req, res) => {
	/*if (!req.body.accessToken) {
		return res.status(400).json({message: "Missing access token in request"});
	}*/
	if (!req.body.googleId) {
		return res.status(400).json({message: "Missing Google ID in request"});
	}
	if (!req.body.email) {
		return res.status(400).json({message: "Missing email in request"});
	}
	
	User.findOne({$or: [{googleId: req.body.googleId}, {email: req.body.email}]}, (err, user) => {
		if (err) {
			return res.status(500).json({message: "Internal server error"});
		}

		if (!user) {
			return res.status(400).json({message : "User not found 2"});
		}
		
		User.findOneAndUpdate({$or: [{googleId: req.body.googleId}, {email: req.body.email}]}, {$set: {accessToken: req.body.accessToken}}, {new: true}, (err, user) => {
			if (err) {
				return res.status(500).json({message: "Internal server error"});
			}

			if (!user) {
				return res.status(400).json({message: "User not found 3"});
			}

			return res.status(200).json({message: "Success", username: user.username, email: user.email});
		});
	});
});

app.post("/profile/update_username", (req, res) => {
	let newUsername = req.body.username;
	let token = req.body.accessToken;
	let email = req.body.email;
	let oldUsername = req.body.oldUsername;

	if (!newUsername) {
		res.status(400).json({message: "Missing new username"});
	}
	if (!token) {
		res.status(400).json({message: "Missing authentication token"});
	}
	if (!email) {
		res.status(400).json({message: "Missing email"});
	}
	if (!oldUsername) {
		res.status(400).json({message: "Missing old username"});
	}

	User.findOneAndUpdate({username: oldUsername}, {$set: {username: 'IlovePurdueCS'}}, {new: true}, (err, user) => {
		if (err) {
			return res.status(500).json({message: "Internal server error"});
		}
		if (!user) {
			return res.status(400).json({message: "Usr not found " + oldUsername});
		}

		return res.status(200).json({message: "Successfully updated username", data: newUsername});
	});
});

app.post("/calendar", (req, res) => {
	// Return JSON with Google calendar information, requires valid auth middleware
	/*if (!req.body.email) {
		return res.status(400).json({message: "No email specified in request"});
	}*/
	if (!req.body.accessToken) {
		return res.status(400).json({message: "No token specified in request"});
	}
	if (!req.body.username) {
		return res.status(400).json({message: "No username specified in request"});
	}

	let token = req.body.accessToken;
	let usrname = req.body.username;
	
	User.findOne({$or: [{token: token}, {username: usrname}]}, (err, user) => {
		if (err) {
			return res.status(500).json({message: "Internal server error"});
		}
		if (!user) {
			return res.status(400).json({message: "No user found"});
		}

		// console.log("Sending back user's calendar: " + user.calendar);
		return res.status(200).json({message: "Success", calendar: user.calendar});
	});
});

app.post("/profile/updatePhoneNumber", (req, res) => {
	let newPhone = req.body.phoneNumber;
	let token = req.body.accessToken;
	let email = req.body.email;
	let usr = req.body.username;

	if (!newPhone) {
		return res.status(400).json({message: "No new username in request"});
	}
	if (!token) {
		return res.status(400).json({message: "No token in request"});
	}
	if (!email) {
		return res.status(400).json({message: "No email in request"});
	}
	if (!usr) {
		return res.status(400).json({message: "No username in request"});
	}
	
	User.findOneAndUpdate({$or: [{email: email}, {username: usr}]}, {$set: {phoneNumber: 1223334444}}, {new: true}, (err, user) => {
		if (err) {
			return res.status(500).json({message: "Internal server error"});
		}
		if (!user) {
			return res.status(400).json({message: "User not found"});
		}

		return res.status(200).json({message: "Successfully updated phone number"});
	});
});

app.post("/profile/update_preferences", (req, res) => {
	//Updates user's preferences in the db. Overwrites previous preferences, so all must be sent with this request
	let newPrefs = req.body.prefs;
	let token = req.body.accessToken;

	if (!newPrefs) {
		return res.status(400).json({message: "No preferences to save in request"});
	}
	if (!token) {
		return res.status(400).json({message: "No token specified in request"});
	}

	User.findOneAndUpdate({token: token}, {$set: {preferences: newPrefs}}, {new: true}, (err, user) => {
		if (err) {
			return res.status(500).json({message: "Internal server error"});
		}
		if (!user) {
			return res.status(400).json({message: "User not found 5"});
		}

		return res.status(200).json({message: "Success", data: user.preferences});
	});
});

app.post("/getShoppingList", (req, res) => {
	if (!req.body.accessToken) {
		return res.status(400).json({message: "Missing access token"});
	}
	if (!req.body.username) {
		return res.status(400).json({message: "Missing username"});
	}

	User.findOne({username: req.body.username}, (err, user) => {
		if (err) {
			return res.status(500).json({message: "Internal server error"});
		}
		if (!user) {
			return res.status(400).json({message: "User not found 6"});
		}

		return res.status(200).json({message: "Success", data: user.savedRecipes});
	});
});

app.post("/updateShoppingList", (req, res) => {
	if (!req.body.accessToken) {
		return res.status(400).json({message: "Missing access token"});
	}
	if (!req.body.username) {
		return res.status(400).json({message: "Missing username"});
	}
	if (!req.body.shoppingList) {
		return res.status(400).json({message: "Missing updated shopping list"});
	}

	User.findOneAndUpdate({username: req.body.username}, {$set: {shoppingList: req.body.shoppingList}}, {new: true}, 
		(err, user) => {
		if (err) {
			return res.status(500).json({message: "Internal server error"});
		}
		if (!user) {
			return res.status(400).json({message: "User not found 7"});
		}

		return res.status(200).json({message: "Success"});
	});
});

app.post("/profile/update_dish_prefs", (req, res) => {
	//Updates user's preferences in the db. Overwrites previous preferences, so all must be sent with this request

	let newDishPrefs = req.body.prefs;
	let token = req.body.accessToken;

	if (!newDishPrefs) {
		return res.status(400).json({message: "No preferences to save in request"});
	}
	if (!token) {
		return res.status(400).json({message: "No token specified in request"});
	}

	User.findOneAndUpdate({token: token}, {$set: {dishPrefs: newDishPrefs}}, {new: true}, (err, user) => {
		if (err) {
			return res.status(500).json({message: "Internal server error"});
		}
		if (!user) {
			return res.status(400).json({message: "User not found 8"});
		}
		return res.status(200).json({updatedUser: user});
	});
});

/*app.get("/profile/preferences", (req, res) => {
	// Return JSON of user's preferences as read from the DB, requires valid auth middleware
	return res.json({"name": "Test User", "email_alerts": "true", "text_alerts": "false", "email": "test@test.org"});
});*/

// app.get("/recipes", (req, res) => {
// 	// For now we're just reading and returning recipes from a JSON file
// 	// In the future, add recipes to DB and work with it from there
// 	return res.json(parsed_recipes);
// });

app.post("/recipes/save", (req, res) => {
	// Saves a recipe into a user's favorites based on recipe ID

	let idToSave = req.body.recipeID;
	let nameToSave = req.body.recipeName;
	let descToSave = req.body.recipeDescription;
	let userEmail = req.body.userEmail;

	if (!idToSave) {
		return res.status(400).json({message: "No ID to save in request"});
	}
	if (!userEmail) {
		return res.status(400).json({message: "No email specified in request"});
	}
	if (!nameToSave) {
		return res.status(400).json({message: "No recipe name in request"});
	}
	if (!descToSave) {
		return res.status(400).json({message: "No recipe description in request"});
	}

	User.findOneAndUpdate({email: userEmail}, {$push: {savedRecipes: {recipeID: idToSave, recipeName: 'nameToSave', recipeDescription: descToSave}}}, 
		{new: true}, (err, user) => {
		if (err) {
			console.log("ERR:", err)
			return res.status(500).json({message: "Internal server error"});
		}
		if (!user) {
			return res.status(400).json({ message: "User not found 9"});
		}

		return res.status(200).json({message: "Success"});
	});
});

app.post("/recipes/remove", (req, res) => {
	let newRecipes = req.body.savedRecipes;
	let userEmail = req.body.userEmail;

	if (!newRecipes) {
		return res.status(400).json({message: "No new recipe array sent"});
	}
	if (!userEmail) {
		return res.status(400).json({message: "No email specified in request"});
	}

	return res.status(200).json({message: "Successfully removed saved recipe"});
	/*User.findOneAndUpdate({email: userEmail}, {$set: {savedRecipes: newRecipes}}, {new: true}, (err, user) => {
		if (err) {
			console.log("ERR:", err)
			return res.status(500).json({message: "Internal server error"});
		}
		if (!user) {
			return res.status(400).json({ message: "User not found 9"});
		}
		return res.status(200).json({message: "Successfully removed saved recipe"});
	})*/
});

app.post("/recipes/updateVote", (req, res) => {
	let token = req.body.accessToken;
	let usrname = req.body.username;
	var currentUser;

	return res.status(200).json({message: "Success", data: recipe});

	if (!req.body.voteCount) {
		return res.status(400).json({message: "No vote count specified"});
	}
	if (!req.body.recipeId) {
		return res.status(400).json({message: "No recipe ID specified"});
	}
	if (!req.body.username) {
		return res.status(400).json({message: "No username specified in request"});
	}
	if (!req.body.vote) {
		return res.status(400).json({message: "No vote specified in request"});
	}

	Recipe.findOneAndUpdate({_id: req.body.recipeId}, {$set: {upvotes: req.body.voteCount}}, {new: true}, (err, recipe) => {
		if (err) {
			return res.status(500).json({message: "Internal server error"});
		}
		if (!recipe) {
			return res.status(400).json({message: "Recipe not found"});
		}

		var dishData = ml.formatDishData(recipe.calories, recipe.servingSize, recipe.upvotes, recipe.steps, recipe.tags);
		console.log("DISH DATA: " + dishData);
		User.findOneAndUpdate({username: usrname}, {$push: {mlDishRatings: req.body.vote, mlDishData: [dishData], votedRecipes: req.body.recipeId}}, {safe: true, upsert: true, new: true}, (err, user) => {
			if (err) {
				return res.status(500).json({message: "Internal server error"});
			}
			if (!user) {
				return res.status(400).json({message: "User not found"});
			}
			currentUser = user;

			return res.status(200).json({message: "Success", data: recipe});
		});
	});
});

app.post("/recipes/new", (req, res) => {
	let accessToken = req.body.accessToken;
	let newRecipe = req.body.recipe;

	if (!accessToken) {
		return res.status(400).json({message: "No access token in request"});
	}
	if (!newRecipe) {
		return res.status(400).json({message: "No recipe in request"});
	}

	var data = newRecipe;
	data.videoId = scraper.getVideos(data.name);
	Recipe.create(data, (err, recipe) => {
		if (err) {
			console.log(err);
			return res.status(500).json({message: "Internal server error"});
		}

		return res.status(200).json({message: "Success", recipe: recipe});
	});
	// TODO(Vedant): do a check for the access token to ensure current user is authenticated
	// before saving recipe
});

app.post("/recipes/:id/newComment", (req, res) => {
	let usrname = req.body.username;
	let newComment = req.body.comment;
	let recipeId = req.params.id;
	let token = req.body.accessToken;

	if (!usrname) {
		return res.status(400).json({message: "Missing username in request"});
	}
	if (!newComment) {
		return res.status(400).json({message: "Missing comment in request"});
	}
	if (!recipeId) {
		return res.status(400).json({message: "Missing recipe ID in parameters"});
	}
	if (!token) {
		return res.status(400).json({message: "Missing token in request"});
	}

	Recipe.findOneAndUpdate({_id: recipeId}, {$push: {comments: {username: 'testUser', comment: newComment}}}, 
		{safe: true, upsert: true, new: true}, (err, recipe) => {
			if (err) {
				return res.status(500).json({message: "Internal server error"});
			}

			return res.status(200).json({message: "Success", data: recipe});
	});
});

app.post("/search", (req, res) => {
	// Search query will be passed in in URL
	// remove URL encoding and perform search on DB
	// returns a list of JSON objects representing recipes related to {query}
	// requires valid auth middleware
	if (!req.query.q) {
		return res.status(400).json({message: "No query specified"});
	}

	let search_q = req.query.q.toLowerCase();

	// TODO(Vedant): add all recipes from recipes.json to the database so
	// we don't have to do this ugly ass query, also search by id
	// //let dat = parsed_recipes.data;
	// let ret_data = [];
	// for (var i in parsed_recipes) {
	// 	if (parsed_recipes[i].name.toLowerCase().indexOf(search_q) !== -1) {
	// 		ret_data.push(parsed_recipes[i]);
	// 	}
	// }

	Recipe.find({$or: [{name: {$regex: search_q, $options: "i"}}, {description: {$regex: search_q, $options: "i"}}, {ingredients: {$elemMatch: {name: {$regex: search_q, $options: "i"}}}}]}, 
		(err, recipes) => {
		if (err) {
			console.log(err);
			return res.status(500).json({message: "Internal server error"});
		}
		if (!recipes) {
			return res.status(400).json({message: "No recipes found"});
		}

		return res.status(200).json({message: "Success", data: recipes});
	});
});

app.post("/logout", (req, res) => {
	let usrname = req.body.username;
	if (!usrname) {
		return res.status(400).json({message: "Missing username in request"});
	}
	req.logout();
	req.session = null;
	User.findOneAndUpdate({username: usrname}, {token: ""}, {new: true}, (err, user) => {
		if (err) {
			return res.status(500).json({message: "Internal server error"});
		}
		if (!user) {
			return res.status(400).json({message: "No user found"});
		}

		return res.status(200).json({message: "Successfully logged out"});
	});
});

app.get('/email/test', (req,res) => {
	var transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: 'thisisbazaarapp@gmail.com', // Your email id
			pass: 'thisisourpassword' // Your password
		}
	});

	let mailOptions = {
		from: '"Bazaar" <thisisbazaarapp@gmail.com>', // sender address
		to: 'nevetia.vedant@gmail.com, zachary.t.rich@gmail.com', // list of receivers
		subject: 'Test from nodemailer', // Subject line
		text: 'This was sent from Bazaar', // plain text body
		html: '<b>HTML in emails cause I can do that</b>' // html body
	};

	// send mail with defined transport object
	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			return console.log(error);
		}
		console.log('Message sent: %s', info.messageId);
		// Preview only available when sending through an Ethereal account
		console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
		return res.json({message: info.response});
	});
});

app.post("/profile/:username", (req, res) => {
	// Get profile information about logged in user, requires valid auth middleware
	if (!req.params.username) {
		return res.status(400).json({message: "Username required in URL"});
	}
	if (!req.body.accessToken) {
		return res.status(400).json({message: "Missing access token"});
	}
	
	User.findOne(({username: req.params.username}), (err, user) => {
		if (err) {
			return res.status(500).json({message: "Internal server error"});
		}
		if (!user) {
			return res.status(400).json({message : "User not found 4"});
		}

		// TODO(Vedant): try this later when we make sure signin works
		// if (user.accessToken !== req.body.accessToken) {
		// 	return res.status(400).json({message: "Not signed in"});
		// }

        return res.status(200).json({message: "Success", user: user});
	});
});

app.post("/recipes/:id", (req, res) => {
	let usrname = req.body.username;
	let currentUser;

	console.log(`\nTHE ENTIRE REQUEST IS ${req.body.username}\n`)

	if (!req.params.id) {
		return res.status(400).json({message: "Missing recipe ID"});
	}

	if (usrname) {
		User.findOne(({username: usrname}), (err, user) => {
			if (err) {
				return res.status(500).json({message: "Internal server error. Unable to process user find"});
			}
			if (!user) {
				console.log('NO USER FOUND');
				Recipe.findOne({_id: req.params.id}, (err, recipe) => {
					if (err) {
						return res.status(500).json({message: "Internal server error. Unable to process recipe find"});
					}
					if (!recipe) {
						return res.status(400).json({message: "No recipe found"});
					}
					
					return res.status(200).json({message: "Success without ML", data: recipe});
				});
			} else {
				Recipe.findOne({_id: req.params.id}, (err, recipe) => {
					if (err) {
						return res.status(500).json({message: "Internal server error. Unable to process recipe find"});
					}
					if (!recipe) {
						return res.status(400).json({message: "No recipe found"});
					}
					
					var dishData = ml.formatDishData(recipe.calories, recipe.servingSize, recipe.upvotes, recipe.steps, recipe.tags);
					var prediction = ml.predict(user.mlDishData, user.mlDishRatings, dishData);
					var voted = user.votedRecipes.indexOf(req.params.id);
					if (voted === -1) {
						return res.status(200).json({message: "Success with ML", data: recipe, ml: prediction, voted: false});
					} else {
						return res.status(200).json({message: "Success with ML", data: recipe, ml: prediction, voted: true});
					}
				});
			}
		});
	} else {
		Recipe.findOne({_id: req.params.id}, (err, recipe) => {
			if (err) {
				return res.status(500).json({message: "Internal server error. Unable to process recipe find"});
			}
			if (!recipe) {
				return res.status(400).json({message: "No recipe found"});
			}
			
			return res.status(200).json({message: "Success without ML", data: recipe});
		});
	}
});

//sent obj with day as string (e.g. 'Monday'), meal as string (e.g. "breakfast"), 
// id as string (e.g. '243786ab4f90e' the hex stuff from the db), and token for auth
// in req.body: day, time, id, token
app.post('/calendar/update', (req, res) => {
	if (!req.body.day) {
		return res.status(400).json({message: "No day specified in request"});
	}
	if (!req.body.time) {
		return res.status(400).json({message: "No time specified in request"});
	}
	if (!req.body.meal) {
		return res.status(400).json({message: "No meal object specified in request"});
	}
	if (!req.body.accessToken) {
		return res.status(400).json({message: "No token specified in request"});
	}
	if (!req.body.email) {
		return res.status(400).json({message: "No email specified in request"});
	}
	
	let day = req.body.day;
	let time = req.body.time;
	let meal = req.body.meal;
	let token = req.body.accessToken;
	let em = req.body.email;
	
	User.findOne({$or: [{email: em}, {token: token}]}, (err, user) => {
		if (err) {
			return res.status(500).json({message: "Internal server error"});
		}
		if (!user) {
			return res.status(400).json({message: "No user found"});
		}

		// console.log("meal is " + meal.id + " " + meal.name + " " + meal.calorieCount);
		user.calendar[day][time] = meal;
		// console.log("user calendar is " + user.calendar[day][time]);

		user.save((err) => {
			if (err) {
				return res.status(500).json({message: "Internal server error: Unable to save user data"});
			}

			return res.status(200).json({message: "Successfully updated calendar", data: user.calendar});
		});
	});
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/");
}

var port = process.env.PORT || 8000;
var server = app.listen(port, () => {
	console.log("Running server on port " + port);

	var transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: 'thisisbazaarapp@gmail.com', // Your email id
			pass: 'thisisourpassword' // Your password
		}
	});



	new CronJob('0 0 9 * * 0', function() {
		User.find({} , (err, users) => {
			if(err) {
				console.error("ERR:", err);
			}
	
			users.map(user => {
				console.log('now emailing user', user.username, 'with email', user.email);
				let mailOptions = {
					from: '"Bazaar App" <thisisbazaarapp@gmail.com>', // sender address
					to: user.email, // list of receivers
					subject: `Hi ${user.username}, here are your recipes for the week!`, // Subject line
					text: `Here are your recipes for the week:\n${user.calendar}` ,
				};
			
				// send mail with defined transport object
				transporter.sendMail(mailOptions, (error, info) => {
					if (error) {
						return console.log(error);
					}
					console.log('Message sent: %s', info.messageId);
					// Preview only available when sending through an Ethereal account
					console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
					return res.json({message: info.response});
				});
			})
		})
	}, null, true, 'America/New_York');
});

function stop() {
	console.log('Closing server...')
	server.close();
	process.exit();
	return 0;
}

module.exports = server;
module.exports.stop = stop;

