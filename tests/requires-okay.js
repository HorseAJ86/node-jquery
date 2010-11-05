(function (undefined) {
  var $ = require('jquery');
  //var jq = require('jquery');
  $("<h1>test passes</h1>").appendTo("body");
  console.log($("body").html());
  //console.log(jq("body").html());
}());
