/**
 * Created by Anatolij on 25.10.2016.
 */
var util = require('util');
var spawnSync = require('child_process').spawnSync;
module.exports = function (request) {
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
        try {
            var res = JSON.parse(proc.stdout);
            if (proc.stderr) delete proc.stderr;
        } catch (e) {
            if (!proc.stderr) proc.stderr = '';
            proc.stderr += (e.stack || e.message)+"\n";
            res.error = new Error(proc.stderr);
        }

        return res;
    };

    if (!request.sync) request.sync = function() { return _func({ cmd: 'request', arguments: arguments }); };
    if (!request.get.sync) request.get.sync = request.getSync = function() { return _func({ cmd: 'get', arguments: arguments }); };
    if (!request.head.sync) request.head.sync = request.headSync = function() { return _func({ cmd: 'head', arguments: arguments }); };
    if (!request.post.sync) request.post.sync = request.postSync = function() { return _func({ cmd: 'post', arguments: arguments }); };
    if (!request.put.sync) request.put.sync = request.putSync = function() { return _func({ cmd: 'put', arguments: arguments }); };
    if (!request.patch.sync) request.patch.sync = request.patchSync = function() { return _func({ cmd: 'patch', arguments: arguments }); };
    if (!request.del.sync) request.del.sync = request.delSync = function() { return _func({ cmd: 'delete', arguments: arguments }); };

    return request;
};