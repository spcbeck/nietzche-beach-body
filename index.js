var Twit = require("twit");
var async = require("async");
var wikiquote = require("./wikiquote");
var rp = require('request-promise');

/*var t = new Twit({
  consumer_key          : process.env.NIETZCHE_TWIT_CONSUMER_KEY,
  consumer_secret       : process.env.NIETZCHE_TWIT_CONSUMER_SECRET,
  access_token          : process.env.NIETZCHE_TWIT_ACCESS_TOKEN,
  access_token_secret   : process.env.NIETZCHE_TWIT_ACCESS_TOKEN_SECRET
});*/


run = function() {

	async.waterfall([
		wikiquote.searchWikiquote,
		wikiquote.getQuotes
	],
	function(err) {
		if (err) {
		  console.log('There was an error posting to Twitter: ', err);
		} else {
		  console.log('Tweet successful!');  
		}
	});
}

run();
