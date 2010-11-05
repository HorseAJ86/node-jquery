node-jQuery
====

A stupid-simple wrapper over jQuery for nodejs. Currently 1.4.3.

Works in the Browser and in Node.JS.


    npm install jquery

    var $ = require('jquery');

    $("<h1>test passes</h1>").appendTo("body");
    console.log($("body").html());


In Node.JS you may also create separate window instances

  var jsdom = require('jsdom').jsdom,
      myWindow = jsdom().createWindow(),
      $ = require('jquery'),
      jq = require('jquery').create(),
      jQuery = require('jquery').create(myWindow);

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

`XMLHttpRequest` is not yet in npm, so I'm waiting on that.

I may impmement it on top of `AbstractHttpRequest`, which is `request`-compatible
