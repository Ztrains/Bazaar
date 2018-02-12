var mocha = require("mocha");
var req = require("supertest");
var fs = require("fs");

describe("loading express module", () => {
	var server;
	beforeEach(() => {
		server = require("../index.js");
	});
	it("responds to /", function testRoot(done) {
		req(server).get("/").expect(200, done);
	});
	it("responds to /auth/google", function testAuthGoogle(done) {
		req(server).get("/auth/google").expect(302, done);
	});
	it("fetches data correctly from /recipes", function testFetchRecipes(done) {
		req(server).get("/recipes").expect(200, done);
	});
	it("gets the JSON from /recipes", function testRecipeJSONFetch(done) {
		var js = fs.readFileSync("./recipes.json");
		var response = req(server).get("/recipes");
		done();
	});
	it("responds with correct status code when doing search without search param", function searchParam(done) {
		req(server).get("/search").expect(400, done);
	});
	it ("GET request to /auth/google should correctly redirect to Google OAuth signin page", function googleAuth(done) {
		req(server).get("/auth/google").expect(302, done);
	});
	it("GET calendar information about user", function getCalendar(done) {
		req(server).get("/calendar").expect(200, done);
	})
})