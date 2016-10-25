# Sync version of Request

Allow you send synchronous requests. Depends on "request" module https://github.com/request/request/.
Supports upload and download sync.

#### Installation
```sh
$ npm install -s syncrequest
```

#### Simple:
```javascript
var request = require('syncrequest');
var result = request.sync('http://www.comlog.org');
console.info(result);
// {error: null, response: {...}, body: '...'}
```

#### Download file:
```javascript
var request = require('syncrequest');
var result = request.sync('http://www.comlog.org', {pipe: fs.createWriteStream('index.html')});
// OR var result = request.sync('http://www.comlog.org', {pipe: 'index.html'});
console.info(result);
// {error: null, response: null, body: null}
```

#### getSync function:
```javascript
var request = require('syncrequest');
var result = request.get.sync('http://www.comlog.org');
console.info(result);
// {error: null, response: {..}, body: '...'}
```

#### postSync function:
```javascript
var request = require('syncrequest');
var result = request.post.sync('http://www.comlog.org');
console.info(result);
// {error: null, response: {...}, body: '...'}
```

#### postSync upload:
```javascript
// like original request module https://github.com/request/request#forms
var request = require('syncrequest');
var result = request.post.sync('http://www.comlog.org', {formData: {
    test: 'test',
    my_file: fs.createReadStream('index.html')
}});
console.info(result);
// {error: null, response: {...}, body: '...'}

// OR
var result = request.post.sync({url: 'http://www.comlog.org', formData: {
    test: 'test',
    my_file: fs.createReadStream('index.html')
}});
console.info(result);
// {error: null, response: {...}, body: '...'}

```
