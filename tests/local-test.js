(function (undefined) {
  var jsdom = require('jsdom').jsdom,
      myWindow = jsdom().createWindow(),
      $ = require('../lib/jquery-1.4.3'),
      jq = require('../lib/jquery-1.4.3').create(),
      jQuery = require('../lib/jquery-1.4.3').create(myWindow);

    $("<h1>test passes</h1>").appendTo("body");
    console.log($("body").html());

    jq("<h2>other test passes</h2>").appendTo("body");
    console.log(jq("body").html());

    jQuery("<h3>third test passes</h3>").appendTo("body");
    console.log(jQuery("body").html());

}());
