const app = require("express")();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req,res) => {
	return res.send("Welcome to Bazaar!");
})

var port = process.env.PORT || 8000;
app.listen(port, function() {
	console.log("Running server on port " + port);
});