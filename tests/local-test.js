(function (undefined) {
  var jsdom = require('jsdom').jsdom,
      myWindow = jsdom().createWindow(),
      $ = require('../dist/node-jquery'),
      jq = require('../dist/node-jquery').create(),
      jQuery = require('../dist/node-jquery').create(myWindow);

    $("<h1>test passes</h1>").appendTo("body");
    console.log($("body").html());

    jq("<h2>other test passes</h2>").appendTo("body");
    console.log(jq("body").html());

    jQuery("<h3>third test passes</h3>").appendTo("body");
    console.log(jQuery("body").html());

}());
