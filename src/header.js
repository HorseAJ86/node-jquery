(function () {
function create(window) {
  var location, navigator, XMLHttpRequest;

  window = window || require('jsdom').jsdom().createWindow();
  location = window.location || {};
  navigator = window.navigator || { userAgent: "Node.js" };

  if ('function' !== typeof window.XMLHttpRequest && 'function' !== typeof window.ActiveXObject) {
    window.XMLHttpRequest = function () {};
    // TODO
    // node-XMLHttpRequest, Zombie, or AHR needs a good XMLHttpRequestneeds to be put on npm
  }


