# node-allocine-api

Node.js module used to access the Allocine API.

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

#### allocine.search(text, callback)

`text` is the text you want to search. When results are retrieved, the `callback` function will be called with the results found (object).

#### 
