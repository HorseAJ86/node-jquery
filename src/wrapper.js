(function () {
function create(window) {
  window = window || require('jsdom').jsdom().createWindow();
  
  // assume window is a jsdom instance...
  // jsdom includes an incomplete version of XMLHttpRequest
  window.XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
  // trick jQuery into thinking CORS is supported (should be in node-XMLHttpRequest)
  window.XMLHttpRequest.prototype.withCredentials = false;

  var location = window.location,
      navigator = window.navigator,
      XMLHttpRequest = window.XMLHttpRequest;

  //JQUERY_SOURCE

  window.jQuery.noConflict();
  return window.jQuery;
}
module.exports = create('undefined' === typeof window ? undefined : window);
module.exports.create = create;
}());
