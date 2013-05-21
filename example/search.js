var allocine = require('../lib/allocine-api');

allocine.search('spiderman', function(results) {
	console.log('Success !');
	console.log(results);
});