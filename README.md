How to use jQuery (>= 2.x) in Node.js (>= 0.10)
===

```bash
npm install -S jquery@>=2.1
```

`how-to-use-jquery-with-node.js`:
```javascript
(function () {
  'use strict';
  
  var jsdom = require('jsdom').jsdom
    , document = jsdom('<html><body><h1>Hello World!</h1<p class="hello">Heya Big World!</body></html>')
    , window = document.createWindow()
    , $ = require('jquery')(window)
    ;
    
  console.log($('.hello').text());
}());
```

This code in this repository is obsolete. Please don't use it. Use the new official jquery instead.
