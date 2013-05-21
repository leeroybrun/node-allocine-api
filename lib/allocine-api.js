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
        search: this.preset({ filter: 'movie,tvseries'})
    });

    // Build URI for accessing Allocine API
    this.buildUri = function(route, params) {
        var uri = this.config.apiBasePath + route;

        // Extend URI params with route presets
        this.extend(params, this.presets[route]);

        if(params) {
            var tokens = [];

            // Fill the tokens array and sort it
            for(var param in params) {
                tokens.push(param +'='+ encodeURIComponent(params[param]));
            }
            tokens.sort();

            uri += '?'+ tokens.join('&');

            // Build and encode URI
            var date = new Date();
            var sed = date.getFullYear() +''+ ('0'+ (date.getMonth()+1)).slice(-2) +''+ date.getDate();
            var sig = this.config.apiSecretKey + tokens.join('&') +'&sed='+ sed;

            // Hash "sig" parameter
            var shasum = crypto.createHash('sha1')
            sig = shasum.update(sig, 'utf-8').digest('base64');

            return uri +'&sed='+ sed +'&sig='+ sig;
        }
        
        return uri;
    }

    this.makeRequest = function(uri, callback) {
        var options = {
            hostname: this.config.apiHostName, 
            path: uri, 
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

    // Search the Allocine API
    this.search = function(query, callback) {
        var uri = this.buildUri('search', {'q': query});

        this.makeRequest(uri, callback);
    }

    return this;
}

module.exports = new allocine();