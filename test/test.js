var request = require('../');
var fs = require('fs');

try {
    var ws = fs.createReadStream('index.html');
    ws.on('close', function () {
       console.info('Stream closed');
    });
    var result = request.postSync('http://www.comlog.org/index.php', {
        formData: {
            id: 2,
            test: ws
        }
    });
    console.info(result);
} catch (e) {
    console.error(e);
    console.error(e.stack);
}
