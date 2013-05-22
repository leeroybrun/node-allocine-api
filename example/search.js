var allocine = require('../lib/allocine-api');

allocine.api('search', {q: 'spiderman', filter: 'movie', count: 20}, function(results) {
	console.log('Success !');
	console.log(results);
});