(function () {
function create(window) {
  var location, navigator, XMLHttpRequest;

  window = window || require('jsdom').jsdom().createWindow();
  location = window.location || require('location');
  navigator = window.navigator || require('navigator');

  if (!window.XMLHttpRequest && 'function' !== typeof window.ActiveXObject) {
    window.XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
  }

  //JQUERY_SOURCE

  window.jQuery.noConflict();
  return window.jQuery;
}
module.exports = create('undefined' === typeof window ? undefined : window);
module.exports.create = create;
}());
