var rp = require('request-promise');

module.exports = {
	searchWikiquote: function(cb) { 
		var options = {
		    uri: 'https://en.wikiquote.org/w/api.php',
		    qs: {
		    	format: 'json',
		        action: 'query', // -> uri + '?access_token=xxxxx%20xxxxx'
		        titles: 'Nietzsche'
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

		    	console.log(page.pageid);

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
				prop: 'sections',
				pageid: pageID
			},
			headers: {
		        'User-Agent': 'Request-Promise'
		    },
		    json: true // Automatically parses the JSON string in the response
		}

		rp(options)
			.then(function (result) {
				var sectionArray = [];
				var sections = result.parse.sections;

				console.log(result);

				for(var s in sections) {
					
				}
				
			})
			.catch(function (err) {
				console.log("it no workie");
			})
	}
}