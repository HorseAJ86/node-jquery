var testCase = require('nodeunit').testCase;
var jsdom = require('jsdom').jsdom;
var jquery = require(__dirname + '/../lib/node-jquery');
var fs = require('fs');

// Execution context object
var context = {
	'jsdom': jsdom
};

/**
* Returns an array of elements with the given IDs, eg.
* @example q("main", "foo", "bar")
* @result [<div id="main">, <span id="foo">, <input id="bar">]
*/
context.q = function query_ids() {

	var r = [];

	for ( var i = 0; i < arguments.length; i++ ) {
		r.push( context.document.getElementById( arguments[i] ) );
	}

	return r;
};

function recreate_doc(fixture) {
	var markup = fs.readFileSync('test/fixtures/' + (fixture||'core') + '.html', 'utf8');
	context.document = jsdom(markup);
	context.window = context.document.createWindow();
	context.$ = jquery.create(context.window, '1.8');
}

var testSuite = {
	setUp: function (callback) {
		recreate_doc();
		callback();
	}
};

var tests, defaults = ['collections', 'core', 'dom', 'fn', 'objects', 'selector', 'sub', 'type', 'utils'];
if(process.env.TEST) {
	tests = [process.env.TEST];
} else {
	tests = defaults;
}

tests.forEach(function(name) {
	var test = require('./' + name)(context);
	// Copy over the tests into the suite
	Object.keys(test).forEach(function(key) {
		testSuite[key] = test[key];
	});
});

if(tests === defaults || tests.indexOf('css') > -1) {
	testSuite.css = require('./css')(context);
	testSuite.css.setUp = function (callback) {
		recreate_doc('css');
		callback();
	};
}

module.exports = testCase(testSuite);
