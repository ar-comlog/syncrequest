var _fs = require('fs');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
process.env.NODE_NO_WARNINGS = 1;

var _responce = function functionName(error, response, body) {
    console.info(JSON.stringify({error: error, response: response, body: body}));
};

var _getWS = function(p) {
    var path = typeof p == 'string' ? p : p.path;
    return _fs.createWriteStream(path);
};

var _getRS = function(p) {
    var path = typeof p == 'string' ? p : p.path;
    return _fs.createReadStream(path);
};

try {
    var request = require('request');
    var settings = process.argv[2] ? JSON.parse(process.argv[2]) : {};

    var f = null;
    switch (settings.cmd) {
        case 'request': f = request; break;
        default: f = request[settings.cmd]; break;
    }

    var url, options, callback, ws;

    if (typeof settings.arguments[0] != 'string') {
        options = settings.arguments[0];
    }
    else {
        url = settings.arguments[0];
        if (settings.arguments[1] && typeof settings.arguments[1] != 'function') {
            options = settings.arguments[1];
        }
    }

    if (!options || !options.pipe) {
        callback = function(error, response, body) {
            _responce(error, response, body);
        };
    } else {
        ws = _getWS(options.pipe);
        ws.on('close', function(error) {
            _responce(null, null, null);
        });
        ws.on('error', function(error) {
            _responce(error, null, null);
        });
    }

    if (options && options.formData) {
        for(var i in options.formData) {
            if (options.formData[i] instanceof Array) {
                for(var j=0; j < options.formData[i].length; j++) {
                    if (options.formData[i][j] && options.formData[i][j].path) {
                        options.formData[i][j] = _getRS(options.formData[i][j].path);
                    }
                }
            }
            else if (options.formData[i]) {
                if (options.formData[i].path) {
                    options.formData[i] = _getRS(options.formData[i].path);
                }
                else if (options.formData[i].value && options.formData[i].value.path) {
                    options.formData[i].value = _getRS(options.formData[i].value.path);
                }
            }
        }
    }

    //console.info(options);

    var arguments = [];
    if (url) arguments.push(url);
    if (options) arguments.push(options);
    if (callback) arguments.push(callback);

    var res = f.apply(request, arguments);
    if (ws) res.pipe(ws);
} catch (e) {
    //console.error(e.stack);
    _responce(e, null, null);
}