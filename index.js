const app = require('express')();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/***** Start of db code *******/
let mongoDB = 'mongodb://127.0.0.1/bazaar';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise; // not sure we need promises yet
let db = mongoose.connectionl;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// from here to stars just testing, should be in separate file probably
let recipeSchema = new mongoose.Schema({
	test_string: String,
	test_num: Number
});
let recipeModel = mongoose.model('Recipes', recipeSchema);
/******************************/

app.get('/', (req, res) => {
	return res.send('Welcome to Bazaar!');
});

var port = process.env.PORT || 8000;
app.listen(port, () => {
	console.log('Running server on port ' + port);
});
