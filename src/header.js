(function () {
function create(window) {
  if ('undefined' === typeof window) {
    window = require('jsdom').jsdom().createWindow();
  }
  if ('function' !== typeof window.XMLHttpRequest && 'function' !== typeof window.ActiveXObject) {
    window.XMLHttpRequest = function () {};
    // TODO
    // node-XMLHttpRequest needs to get on npm
    // or I'm going to fork re-implement it in AHR
    navigator = {};
    navigator.userAgent = "Node.js";
    location = window.location;
  }

  // jQuery uses an blank navigator usage
  if('undefined' === typeof navigator) {
	  navigator = window.navigator;
  }


