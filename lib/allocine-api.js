var crypto = require('crypto'),
    http = require('http');

var allocine = function() {

    // Configuration
    this.config = {
        apiHostName:  'api.allocine.fr',
        apiBasePath:  '/rest/v3/',
        apiPartner:   'V2luZG93czg',
        apiSecretKey: 'e2b7fd293906435aa5dac4be670e7982',
        bindAppId:    'Anfn70Soiz74MdfJu9cjsMxCU28UHQmY9VXAh1trN7Zs_2_gSEujB0pxCVkypcRe',
        imgBaseUrl:   'http://images.allocine.fr',
        userAgent:    'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0; MSAppHost/1.0)'
    };

    // Global presets for the API params
    this.presets = {
        global: {
            partner: this.config.apiPartner,
            format: 'json'
        }
    }

    // Extend the presets with the given params and return the resulting object
    this.preset = function(params) {
        return this.extend({}, this.presets.global, params);
    }

    this.extend = function (dst) {
        for (var i = 0; i < arguments.length; i++) {
            if (arguments[i] !== dst) {
                for(var key in arguments[i]) {
                    dst[key] = arguments[i][key];
                };
            }
        };

        return dst;
    }

    // Extend the presets with API route specific presets
    this.extend(this.presets, {
        search: this.preset({ filter: 'movie,tvseries,theater,news,video'})
    });

    // Build path for accessing Allocine API
    this.buildPath = function(route, params) {
        var path = this.config.apiBasePath + route;

        // Extend params with route presets
        params = this.extend({}, this.presets[route], params);

        if(params) {
            var tokens = [];

            // Fill the tokens array and sort it
            for(var param in params) {
                tokens.push(param +'='+ encodeURIComponent(params[param]));
            }
            tokens.sort();

            path += '?'+ tokens.join('&');

            // Build and encode path
            var date = new Date();
            var sed = date.getFullYear() +''+ ('0'+ (date.getMonth()+1)).slice(-2) +''+ date.getDate();
            var sig = this.config.apiSecretKey + tokens.join('&') +'&sed='+ sed;

            // Hash "sig" parameter
            var shasum = crypto.createHash('sha1')
            sig = shasum.update(sig, 'utf-8').digest('base64');

            return path +'&sed='+ sed +'&sig='+ sig;
        }
        
        return path;
    }

    // Request the API with the given path
    this.request = function(path, callback) {
        var options = {
            hostname: this.config.apiHostName, 
            path: path, 
            headers: {
                'User-Agent': this.config.userAgent
            }
        };

        http.get(options, function(res) {
            if(res.statusCode == 200) {
                var data = '';

                res.on('data', function(chunk) {
                    data += chunk;
                });

                res.on('end', function() {
                    callback(JSON.parse(data));
                });
            } else {
                console.log('Allocine API : error '+ res.statusCode)
            }
        }).on('error', function(e) {
            console.log('Allocine API : error "'+ e.message +'"');
        });;
    }

    // Search Allocine API
    this.search = function(query) {
        var callback, 
            options = {};

        // Only 2 arguments provided (query and callback)
        if(arguments.length == 2) {
            callback = arguments[1];

        // 3 arguments : query, callback and maybe filter or options
        } else if(arguments.length == 3) {
            callback = arguments[2]; // Callback is the 3rd argument (last)

            // If second argument is an object -> its the options
            if(typeof arguments[1] == 'object' && arguments[1] !== null) {
                options = arguments[1];

            // If it's a string -> it's the filter
            } else if(typeof arguments[1] == 'string' && arguments[1] !== null) {
                options.filter = arguments[1];
            }
        }

        this.extend(options, {'q': query});

        var path = this.buildPath('search', options);

        this.request(path, function(results) { callback(results.feed); });
    }

    return this;
}

module.exports = new allocine();