var request = require("request");
var cheerio = require("cheerio");

function getVideos(query, next) {
    results = []
    var searchTerm = query.replace(" ", "+");
    var url = "https://www.youtube.com/results?search_query=" + searchTerm
    
    var data = request(url, function(err, resp, body) {
      $ = cheerio.load(body);
      links = $('a'); //jquery get all hyperlinks
      $(links).each(function(i, link) {
        var videoLink = String($(link).attr("href"));
        if (videoLink.search("/watch") !== -1 && videoLink.search("&list=") === -1) {
            var retData = videoLink.replace("/watch?v=", "");
            return retData;
        }
      });

    return "";
    });

    next(data);
}

module.exports = getVideos;