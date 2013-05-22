var allocine = require('../lib/allocine-api');

allocine.api('movie', {code: 128188}, function(result) {
	console.log('Success !');
	console.log(result.movie.title);
});