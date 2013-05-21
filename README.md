# node-allocine-api

Node.js module used to access the Allocine API.

No dependencies needed ! Only core modules.

This is one of my first Node.js modules, so please be kind and don't hesitate to suggest me improvements !

## Install it

To install it, simply add this repository tarball to your package.json dependencies :

```json
"dependencies" : {
	...
    "allocine-api": "https://github.com/leeroybrun/node-allocine-api/tarball/master"
}
```

Then make a simple `npm install`, and npm will install the module for you.

## Use it

Then you can simple require it like any other module inside your project files :

```javascript
var allocine = require('allocine-api');
```

### Methods

Here are the available methods for accessing the Allocine API :

#### allocine.search

Here are the arguments combinaison you can pass to the function
* (query, callback)
* (query, filter, callback)
* (query, options, callback)

Arguments :
* query    -> text to search
* filter   -> string, comma separated, defining the type of content to search for : movie,tvseries,theater,news,video
* options  -> object containing the query options
* callback -> callback to call when the results are retrieved

Examples :
```javascript
// Only query and callback
allocine.search('spiderman', function(results) { console.log(results.totalResults); });

// Query, filter and callback
allocine.search('spiderman', 'movie', function(results) { console.log(results.totalResults); });

// Query, options and callback
allocine.search('spiderman', {count: 10, filter: 'movie'}, function(results) { console.log(results.totalResults); });
```

#### 
