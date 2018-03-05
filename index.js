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

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

app.use(cookieSession({
	name: "bazaar-session",
	keys: ['keanureeves'],
	maxAge: 24 * 60 * 60 * 1000
}));
app.use(cookieParser());

var corsOption = {
	origin: true,
	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
	credentials: true,
	exposedHeaders: ['x-auth-token']
  };

  app.use(cors(corsOption));

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
				return callback(err);
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
						return console.error('ERROR: ', err);
					}
					if (!user) {
						return res.status(400).json({ message: 'user not found'});
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
	res.status(200).json({ "message": "send back calendar information here" });
});

app.post("/profile/update_username", (req, res) => {
	// for now we're updating the username by getting the frontend
	// to pass the user's email in the request body so we can do a lookup in the db
	// by email, and change the username for the user whose email corresponds
	// to that email. Later on, do this by checking user session to find user
	let newUsername = req.body.username;
	let userEmail = req.body.email;

	User.findOne(({ 'email': userEmail }), (err, user) => {
		if (err) {
			return console.error('ERROR: ', err);
		}
		if (!user) {
			return res.status(400).json({ message: 'user not found' });
		}

		user.username = newUsername;
		user.save((err) => {
			if (err) {
				return res.status(400).json({ message: "internal server error" });
			}
			return res.status(200).json({ message: "successfully updated username" });
		});
	});
});

app.post("/profile/update_preferences", (req, res) => {
	//Updates user's preferences in the db. Overwrites previous preferences, so all must be sent with this request

	let newPrefs = req.body.prefs;
	let userEmail = req.body.userEmail;

	if (!newPrefs) {
		return res.status(400).json({message: "No preferences to save in request"});
	}
	if (!userEmail) {
		return res.status(400).json({message: "No email specified in request"});
	}

	User.findOneAndUpdate({email: userEmail}, {$set: {preferences: newPrefs}}, {new: true}, (err, user) => {
		if (err) {
			return console.error('ERROR: ', err);
		}
		if (!user) {
			return res.status(400).json({ message: 'user not found'});
		}
	});
});

app.get("/profile/preferences", (req, res) => {
	// Return JSON of user's preferences as read from the DB, requires valid auth middleware
	return res.json({"name": "Test User", "email_alerts": "true", "text_alerts": "false", "email": "test@test.org"});
});

app.get("/recipes", (req, res) => {
	// For now we're just reading and returning recipes from a JSON file
	// In the future, add recipes to DB and work with it from there
	return res.json(parsed_recipes);
});

app.post("/recipes/save", (req,res) => {
	// Saves a recipe into a user's favorites based on recipe ID

	let idToSave = req.body.recipeID;
	let userEmail = req.body.userEmail;

	if (!idToSave) {
		return res.status(400).json({message: "No ID to save in request"});
	}
	if (!userEmail) {
		return res.status(400).json({message: "No email specified in request"});
	}

	User.findOneAndUpdate({email: userEmail}, {$push:{savedRecipes:idToSave}}, {new:true}, (err, user) => {
		if (err) {
			return console.error('ERROR: ', err);
		}
		if (!user) {
			return res.status(400).json({ message: 'user not found'});
		}
	})
});

// ML route - temporary
app.get("/chini", (req, res) => {
	res.json({message: "Like"});
});

app.get("/search", (req, res) => {
	// Search query will be passed in in URL
	// remove URL encoding and perform search on DB
	// returns a list of JSON objects representing recipes related to {query}
	// requires valid auth middleware
	if (!req.query.q) {
		return res.status(400).json({"message": "No query specified"});
	}

	let search_q = req.query.q.toLowerCase();
	//let dat = parsed_recipes.data;
	let ret_data = [];
	for (var i in parsed_recipes) {
		if (parsed_recipes[i].name.toLowerCase().indexOf(search_q) !== -1) {
			ret_data.push(parsed_recipes[i]);
		}
	}

	return res.json(ret_data);
});

app.get("/logout", (req, res) => {
	req.logout();
	req.session = null;
	res.redirect("/");
});

app.get('/email/test', (req,res) => {
	// Generate test SMTP service account from ethereal.email
	// Only needed if you don't have a real mail account for testing
	nodemailer.createTestAccount((err, account) => {
		// create reusable transporter object using the default SMTP transport
		/*let transporter = nodemailer.createTransport({
			name: 'BazaarEmailer',
			host: 'smtp.ethereal.email',
			port: 587,
			secure: false, // true for 465, false for other ports
			auth: {
				user: account.user, // generated ethereal user
				pass: account.pass // generated ethereal password
			}
		});*/

		var transporter = nodemailer.createTransport({
			service: 'Gmail',
			auth: {
				user: 'thisisbazaarapp@gmail.com', // Your email id
				pass: 'thisisourpassword' // Your password
			}
		});

		// setup email data with unicode symbols
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

			// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
			// Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
		});
	});

	//return res.json({message: 'end'});
})

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/");
}

var port = process.env.PORT || 8000;
var server = app.listen(port, () => {
	console.log("Running server on port " + port);
});

function stop() {
	console.log('Closing server...')
	server.close();
	process.exit();
	return 0;
}

module.exports = server;
module.exports.stop = stop;

