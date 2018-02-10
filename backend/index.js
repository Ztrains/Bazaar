require('dotenv').load();
const app = require("express")();
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/***** Start of db code *******/
let mongoDB = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ds125048.mlab.com:25048/bazaar`;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise; // not sure we need promises yet
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var User = require('./models/User');


// from here to stars just testing, should be in separate file probably
let recipeSchema = new mongoose.Schema({
	test_string: String,
	test_num: Number
});
let recipeModel = mongoose.model('Recipes', recipeSchema);
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
	if (!req.body.username) return res.status(400).json({message: 'Username required in request'})
	if (!req.body.email) return res.status(400).json({message: 'Email required in request'})
	if (!req.body.password) return res.status(400).json({message: 'Password required in request'}) //maybe not?
	User.create(req.body, (err, result) => {
		if (err) {
			return console.error(err);
		}
		res.json(result);
	})
});

app.post("/auth/signin", (req, res) => {
	// Retrieve user from DB given info, return error if not found
	// assign a timed token to user's session
});

app.get("/profile", (req, res) => {
	// Get profile information about logged in user, requires valid auth middleware
});

app.get("/calendar", (req, res) => {
	// Return JSON with Google calendar information, requires valid auth middleware
});

app.get("/preferences", (req, res) => {
	// Return JSON of user's preferences as read from the DB, requires valid auth middleware
});

app.get("/recipes", (req, res) => {
	// Return JSON of user's submitted/saved recipes, requires valid auth middleware
});

app.get("/search/:query", (req, res) => {
	// Search query will be passed in in URL
	// remove URL encoding and perform search on DB
	// returns a list of JSON objects representing recipes related to {query}
	// requires valid auth middleware
});

var port = process.env.PORT || 8000;
app.listen(port, () => {
	console.log("Running server on port " + port);
});
