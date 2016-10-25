var request = require('../');
var fs = require('fs');

try {
    var result = request.get.sync('http://www.comlog.org/index.php');
    console.info(result);
} catch (e) {
    console.error(e);
    console.error(e.stack);
}
