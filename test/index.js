var testCase = require('nodeunit').testCase;
var jsdom = require('jsdom').jsdom;
var jquery = require(process.cwd() + '/lib/node-jquery');

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

var markup = require('fs').readFileSync('test/fixtures/core.html', 'utf8');
function recreate_doc() {
	context.document = jsdom(markup);
	context.window = context.document.createWindow();
	context.$ = jquery.create(context.window, '1.8');
}

var testSuite = {
	setUp: function (callback) {
		recreate_doc();
		callback();
	},

	tearDown: function (callback) {
		// clean up
		callback();
	}
};

var tests;
if(process.env.TEST) {
	tests = [process.env.TEST];
} else {
	tests = ['collections', 'core', 'css', 'dom', 'fn', 'objects', 'selector', 'sub', 'type', 'utils'];
}

tests.forEach(function(name) {
	var test = require('./' + name)(context);
	// Copy over the tests into the suite
	Object.keys(test).forEach(function(key) {
		testSuite[key] = test[key];
	});
});

module.exports = testCase(testSuite);
