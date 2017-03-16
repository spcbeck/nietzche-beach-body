var Twit = require("twit");

var t = new Twit({
  consumer_key          : process.env.NIETZCHE_TWIT_CONSUMER_KEY,
  consumer_secret       : process.env.NIETZCHE_TWIT_CONSUMER_SECRET,
  access_token          : process.env.NIETZCHE_TWIT_ACCESS_TOKEN,
  access_token_secret   : process.env.NIETZCHE_TWIT_ACCESS_TOKEN_SECRET
});

