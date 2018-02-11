require('dotenv').load();
const app 			= require("express")();
const passport		= require("passport");
const GoogleStrat	= require("passport-google-oauth20").Strategy;
const bodyParser 	= require("body-parser");
const mongoose 		= require('mongoose');
const fs 			= require("fs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

let raw_recipes = fs.readFileSync("recipes.json");
let parsed_recipes = JSON.parse(raw_recipes);

/***** Start of db code *******/
let mongoDB = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ds125048.mlab.com:25048/bazaar`;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise; // not sure we need promises yet
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var User = require('./models/User');
var Recipe = require('./models/Recipe');
/******************************/

passport.use(new GoogleStrat({
	clientID: process.env.CLIENT_ID,
	clientSecret: process.env.CLIENT_SEC,
	callbackURL: "http://localhost:8000/auth/google/callback"
},
	(accessToken, refreshToken, profile, callback) => {
		User.findOne({
			googleId: profile.id
		}, (err, user) => {
			if (err) {
				return callback(err);
			}

			if (!user) {
				// register user
				user = new User({
					name: profile.displayName,
					email: profile.emails[0].value,
					username: profile.username,
					googleId: profile.id
				});

				user.save((err) => {
					if (err) {
						console.log(err);
					}
					return callback(err, user);
				});
			} else {
				// we found the user
				return callback(err, user);
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

app.all('/*', (req, res, next) => {
    //console.log(req)
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
    next();
});

app.get("/", (req, res) => {
	return res.send("Welcome to Bazaar!");
});

app.get("/auth/google", passport.authenticate("google", { scope: ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/plus.profile.emails.read']}));
app.get("/auth/google/callback", passport.authenticate("google", { successRedirect: "/", failureRedirect: "/auth/signup" }));

app.post("/auth/signup", (req, res) => {
	// Get user information from request body and create new account in DB
	console.log(req.body);
	if (!req.body.username) {
		return res.status(400).json({message: 'Username required in request'});
	}
	if (!req.body.email) {
		return res.status(400).json({message: 'Email required in request'});
	}
	if (!req.body.password) {
		return res.status(400).json({message: 'Password required in request'}); //maybe not?
	}
	
	User.create(req.body, (err, result) => {
		if (err) {
			return console.error(err);
		}
		res.json(result);
	});
	//LOOKS TO MAKE SURE THERE IS USERNAME/EMAIL/PASS IN REQ, THEN ADDS TO DB IF SO
	//VERY BASIC
});

app.post("/auth/signin", (req, res) => {
	// Retrieve user from DB given info, return error if not found
	// assign a timed token to user's session
	if (!req.body.username) {
		return res.status(400).json({message: 'Username required in request'});
	}
	
	User.findOne(({'username': req.body.username}), (err, user) => {
		if (err) {
			return console.error('ERROR:', err);
		}
		if (!user) {
			return res.json({message : 'user not found'});
		}
		console.log('User is: ', user);
        return res.json(user);
	});
	//LOOKS FOR USERNAME SENT IN REQUEST IN THE DATABASE, THEN RETURNS THE USER INFO IF IT EXISTS
});

app.get("/profile/:username", (req, res) => {
	// Get profile information about logged in user, requires valid auth middleware
	if (!req.params.username) {
		return res.status(400).json({message: 'Username required in URL'});
	}
	
	User.findOne(({'username': req.params.username}), (err, user) => {
		if (err) {
			return console.error('ERROR:', err);
		}
		if (!user) {
			return res.json({message : 'user not found'});
		}
		console.log('User is: ', user);
        return res.json(user);
	});
	//BASICALLY COPY-PASTED FROM /auth/signin CAUSE IT DOES BASICALLY THE SAME FOR NOW
});

app.get("/calendar", (req, res) => {
	// Return JSON with Google calendar information, requires valid auth middleware
});

app.get("/preferences", (req, res) => {
	// Return JSON of user's preferences as read from the DB, requires valid auth middleware
	return res.json({"name": "Test User", "email_alerts": "true", "text_alerts": "false", "email": "test@test.org"});
});

app.get("/recipes", (req, res) => {
	// For now we're just reading and returning recipes from a JSON file
	// In the future, add recipes to DB and work with it from there
	return res.json(parsed_recipes);
});

app.get("/search", (req, res) => {
	// Search query will be passed in in URL
	// remove URL encoding and perform search on DB
	// returns a list of JSON objects representing recipes related to {query}
	// requires valid auth middleware
	let search_q = req.query.q.toLowerCase();
	if (!search_q) {
		return res.status(400).json({"message": "No query specified"});
	}
	//let dat = parsed_recipes.data;
	let ret_data = [];
	for (var i in parsed_recipes) {
		if (parsed_recipes[i].name.toLowerCase().indexOf(search_q) !== -1) {
			ret_data.push(parsed_recipes[i]);
		}
	}

	return res.json(ret_data);
});

var port = process.env.PORT || 8000;
app.listen(port, () => {
	console.log("Running server on port " + port);
});



