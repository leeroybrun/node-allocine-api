var allocine = require('../lib/allocine-api');

allocine.search('spiderman', 'movie', function(results) {
	console.log('Success !');
	console.log(results);
});