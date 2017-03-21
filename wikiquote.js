var rp = require('request-promise');
var $ = require('cheerio');

module.exports = {
	searchWikiquote: function(cb) { 
		var options = {
		    uri: 'https://en.wikiquote.org/w/api.php',
		    qs: {
		    	format: 'json',
		        action: 'query',
		        titles: 'Friedrich Nietzsche'
		    },
		    headers: {
		        'User-Agent': 'Request-Promise'
		    },
		    json: true // Automatically parses the JSON string in the response
		};

		rp(options)
		    .then(function (results) {
		    	var pages = results.query.pages;

		    	for(var p in pages) {
		    		var page = pages[p];
		    	}

		    	cb(null, page.pageid);
		    })
		    .catch(function (err) {
		        // API call failed...
		        console.log("it no workie");
		    });
	},

	getQuotes: function(pageID, cb) {
		var options = {
			uri: 'https://en.wikiquote.org/w/api.php',
			qs: {
				format: 'json',
				action: 'parse',
				noimages: '',
				pageid: pageID,
				section: 1
			},
			headers: {
		        'User-Agent': 'Request-Promise'
		    },
		    json: true // Automatically parses the JSON string in the response
		}

		rp(options)
			.then(function (result) {
				var quotes = result.parse.text["*"];
				var quotesArray = [];

				$('li > b', quotes).each(function(i, elem) {

					quotesArray[i] = $(this).text().split(",");
					
				});

				cb(null, quotesArray);
			})
			.catch(function (err) {
				console.log("it no workie:" + err);
			})
	}
}