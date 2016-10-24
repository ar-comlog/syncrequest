var request = require('request');
var util = require('util');
var spawnSync = require('child_process').spawnSync;
//var spawnSync = require('child_process').spawn;

var requestSync = request;

var _func = function (options) {
    //console.log('"'+process.argv[0]+'" "'+__dirname+'/sync.js" \''+JSON.stringify(options)+'\'');

    // close all streams
    if (options && options.arguments) {
        var o = util.isObject(options.arguments[0]) ? options.arguments[0] : (util.isObject(options.arguments[1]) ? options.arguments[1] : null);
        if (o) {
            if (o.pipe && o.pipe.path) streams.push(o.pipe);
            if (o.formData) {
                for(var i in o.formData) {
                    if (util.isArray(o.formData[i])) {
                        for(var j=0; j < o.formData[i].length; j++) {
                            if (o.formData[i][j] && o.formData[i][j].path) {
                                try { o.formData[i][j].close(); } catch (e) {}
                            }
                        }
                    }
                    else if (o.formData[i]) {
                        if (o.formData[i].path) {
                            try { o.formData[i].close(); } catch (e) {}
                        }
                        else if (o.formData[i].value && o.formData[i].value.path) {
                            try { o.formData[i].value.close(); } catch (e) {}
                        }
                    }
                }
            }
        }
    }

    var args = [__dirname + '/sync.js', JSON.stringify(options)];
    var proc = spawnSync(process.argv[0], args, {encoding: 'utf8'});
    var res = JSON.parse(proc.stdout);

    if (proc.stderr.length > 0) res.error = new Error(proc.stderr);
    return res;
};

requestSync.sync = function() { return _func({ cmd: 'request', arguments: arguments }); };
requestSync.sync.get = requestSync.getSync = function() { return _func({ cmd: 'get', arguments: arguments }); };
requestSync.sync.head = requestSync.headSync = function() { return _func({ cmd: 'head', arguments: arguments }); };
requestSync.sync.post = requestSync.postSync = function() { return _func({ cmd: 'post', arguments: arguments }); };
requestSync.sync.put = requestSync.putSync = function() { return _func({ cmd: 'put', arguments: arguments }); };
requestSync.sync.patch = requestSync.patchSync = function() { return _func({ cmd: 'patch', arguments: arguments }); };
requestSync.sync.del = requestSync.delSync = function() { return _func({ cmd: 'delete', arguments: arguments }); };

module.exports = requestSync;