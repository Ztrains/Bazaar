const app = require("express")();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
	return res.send("Welcome to Bazaar!");
});

app.post("/auth/signup", (req, res) => {
	// Get user information from request body and create new account in DB
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
