node-jQuery
====

A stupid-simple wrapper over jQuery for nodejs. Currently 1.4.3.

Works in the Browser and in Node.JS.

    npm install jquery

    var $ = require('jquery');

TODO
====

Currently there is just one global `window`, just like in the browser.

I'd like to make it more privitized so that it's possible to do multiple instances.

  var jsdom = require('jsdom').jsdom,
    window = jsdom().createWindow(),
    $ = require('jQuery').create(window);

`XMLHttpRequest` is not yet in npm, so I'm waiting on that.

I may impmement it on top of `AbstractHttpRequest`, which is `request`-compatible
