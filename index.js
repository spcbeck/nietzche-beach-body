var Twit = require("twit");
var async = require("async");

var t = new Twit({
  consumer_key          : process.env.NIETZCHE_TWIT_CONSUMER_KEY,
  consumer_secret       : process.env.NIETZCHE_TWIT_CONSUMER_SECRET,
  access_token          : process.env.NIETZCHE_TWIT_ACCESS_TOKEN,
  access_token_secret   : process.env.NIETZCHE_TWIT_ACCESS_TOKEN_SECRET
});

getNietzcheQuote = function(cb) {

}

getBeachBodyQuote = function(cb) {

}

buildQuote = function(nietzcheQuote, beachQuote, cb) {

}

sendTweet = function(quote, cb) { 

}