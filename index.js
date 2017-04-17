var Twit = require("twit");
var async = require("async");
var wikiquote = require("./wikiquote");
var rp = require('request-promise');
var cheerio = require('cheerio');

var t = new Twit({
  consumer_key          : process.env.TWIT_CONSUMER_KEY,
  consumer_secret       : process.env.TWIT_CONSUMER_SECRET,
  access_token          : process.env.TWIT_ACCESS_TOKEN,
  access_token_secret   : process.env.TWIT_ACCESS_TOKEN_SECRET
});

crawlBeachQuotes = function(nietzcheQutoes, cb) {
	var options = {
	    uri: "http://stylishlyme.com/stylish-life/beach-quotes/",
	    transform: function (body) {
	        return cheerio.load(body);
	    }
	};

	rp(options)
	    .then(function (result) {
	    	var $ = result;
	    	var quotesArray = [];

	    	$(".entry-content > p").each(function(i,elem) {
	    		quotesArray[i] = $(this).text().split(",");
	    	});

	    	cb(null, quotesArray, nietzcheQutoes);
	
	    })
	    .catch(function (err) {
	        // Crawling failed or Cheerio choked...
	        console.log(err);
	    });
}

function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

formQuote = function(beachQuotes, nietzcheQuotes, cb) {
	var nietzcheQuote = nietzcheQuotes[randomIntFromInterval(0, nietzcheQuotes.length)];
	var beachQuote = beachQuotes[randomIntFromInterval(0, beachQuotes.length)];

	var quote = nietzcheQuote + " " + beachQuote;

	cb(null, quote);
}

tweetQuote = function(quote, cb) {
	t.post('statuses/update', { status: quote }, function(err, data, response) {
	  console.log(response);
	})
}

run = function() {

	async.waterfall([
		wikiquote.searchWikiquote,
		wikiquote.getWikiQuotes,
		crawlBeachQuotes,
		formQuote,
		tweetQuote
	],
	function(err) {
		if (err) {
		  console.log('There was an error posting to Twitter: ', err);
		} else {
		  console.log('Tweet successful!');  
		}
	});
}

try {
	run();
}
catch (e) {
	console.log(e);
}
