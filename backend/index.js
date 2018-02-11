require('dotenv').load();
const app 			= require("express")();
const bodyParser 	= require("body-parser");
const mongoose 		= require('mongoose');
const fs 			= require("fs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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

app.all('/*', (req, res, next) => {
    //console.log(req)
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
    next();
});

app.get("/", (req, res) => {
	return res.send("Welcome to Bazaar!");
});

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

app.get("/search/:search_query", (req, res) => {
	// Search query will be passed in in URL
	// remove URL encoding and perform search on DB
	// returns a list of JSON objects representing recipes related to {query}
	// requires valid auth middleware
	let search = req.query.search_query;
	for (var key in parsed_recipes) {
		if (parsed_recipes.hasOwnProperty(key)) {
			console.log("key is: " + key);
			return res.json({"key": key});
		}
	}
});

var port = process.env.PORT || 8000;
app.listen(port, () => {
	console.log("Running server on port " + port);
});
