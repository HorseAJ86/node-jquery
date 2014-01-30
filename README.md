How to use jQuery (>= 2.x) in Node.js (>= 0.10)
===

```bash
npm install -S 'jquery@>=2.1'
```

`testjq.js`:
```javascript
(function () {
  'use strict';

  var env = require('jsdom').env
    , html = '<html><body><h1>Hello World!</h1><p class="hello">Heya Big World!</body></html>'
    ;

  // first argument can be html string, filename, or url
  env(html, function (errors, window) {
    console.log(errors);

    var $ = require('jquery')(window)
      ;

    console.log($('.hello').text());
  });
}());
```

The instructions above are for the new [official jquery](http://github.com/jquery/jquery) which, for some reason, doesn't have instructions for node in their README.

Don't use the actual code in this repo. It's obsolete and only kept around for legacy apps.
