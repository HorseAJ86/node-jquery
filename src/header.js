(function () {
function create(window) {
  var location, navigator, XMLHttpRequest;

  window = window || require('jsdom').jsdom().createWindow();
  location = window.location || require('location');
  navigator = window.navigator || require('navigator');

  if ('function' !== typeof window.XMLHttpRequest && 'function' !== typeof window.ActiveXObject) {
    window.XMLHttpRequest = require('xmlhttprequest'); // require('XMLHttpRequest');
    // TODO repackage XMLHttpRequest
  }

  // end npm / ender header

