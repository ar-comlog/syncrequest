var request = require('../');
var fs = require('fs');

try {
    var result = request.get.sync({uri:'http://www.comlog.org/index.php', formData: {test:'test'}});
    console.info(result);
} catch (e) {
    console.error(e);
    console.error(e.stack);
}
