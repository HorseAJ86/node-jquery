node-jQuery
====

A stupid-simple wrapper over jQuery for Ender.JS (browser) and Node.JS. Currently 1.6.2.

Ender.JS
---

    ender add jQuery # note the capitalization

    var $ = require('jQuery');

Note: An upcoming Ender.JS update will make it so that 

Node.JS
---

    npm install jquery # note the lowercase

    var $ = require('jquery');

    $("<h1>test passes</h1>").appendTo("body");
    console.log($("body").html());


In Node.JS you may also create separate window instances

    var jsdom = require('jsdom').jsdom
      , myWindow = jsdom().createWindow()
      , $ = require('jquery')
      , jq = require('jquery').create()
      , jQuery = require('jquery').create(myWindow)
      ;

    $("<h1>test passes</h1>").appendTo("body");
    console.log($("body").html());

    jq("<h2>other test passes</h2>").appendTo("body");
    console.log(jq("body").html());

    jQuery("<h3>third test passes</h3>").appendTo("body");
    console.log(jQuery("body").html());

Output:

    <h1>test passes</h1>
    <h2>other test passes</h2>
    <h3>third test passes</h3>


TODO
====

[`XMLHttpRequest`](https://github.com/driverdan/node-XMLHttpRequest) should be submitted to npm as `XMLHttpRequest`
