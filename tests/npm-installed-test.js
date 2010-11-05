(function (undefined) {
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
}());
