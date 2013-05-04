(function () {

  'use strict';

  var jsdom = require('jsdom').jsdom;
  var contextify = require('jsdom/node_modules/contextify');
  var fs = require('fs');
  var path = require('path');

  var availableVersions = {
    'default': '1.8.3',
    '1.6': '1.6.4',
    '1.6.4': '1.6.4',
    '1.7': '1.7.2',
    '1.7.2': '1.7.2',
    '1.8': '1.8.3',
    '1.8.3': '1.8.3',
    '1.9': '1.9.1',
    '1.9.1': '1.9.1',
    '2.0': '2.0.0',
    '2.0.0': '2.0.0'
  };

  function create(window, version) {

    // Create a window, if one doesn't already exists
    var document;
    if ( !window || !window.document) {

      // Create a jsdom window
      document = jsdom('<!doctype html><html><head></head><body></body></html>');
      window = document.createWindow();
    } else {
      document = window.document;
    }

    // assume window is a jsdom instance...
    // jsdom includes an incomplete version of XMLHttpRequest
    window.XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

    // trick jQuery into thinking CORS is supported (should be in node-XMLHttpRequest)
    window.XMLHttpRequest.prototype.withCredentials = false;

    // Create a sandbox to initialize jquery in
    var sandbox = contextify({
      'console' : console,
      'window' : window,
      'document': document,
      'location': window.location,
      'navigator': window.navigator,
      'XMLHttpRequest': window.XMLHttpRequest,
      'setTimeout': window.setTimeout
    });

    // default to 1.8
    version = availableVersions[version || 'default'] || availableVersions['default'];
    var jQFile = 'src/jquery-' + version + '.js';

    // Read jQuery source into memory & eval it in the sandbox
    var jQSourcePath = path.join(__dirname, '..', jQFile);
    var jQSource = fs.readFileSync(jQSourcePath).toString();
    sandbox.run(jQSource, jQFile);

    return window.jQuery;
  }

  module.exports = {
    'create': create
  };

}());
