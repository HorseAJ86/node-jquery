module.exports = function(ctx) {

  'use strict';

  return {
    "type": function(test) {

      var jQuery = ctx.$;
      var document = ctx.document;
      var window = ctx.window;

      test.expect(22);

      test.equals( jQuery.type(null), "null", "null" );
      test.equals( jQuery.type(undefined), "undefined", "undefined" );
      test.equals( jQuery.type(true), "boolean", "Boolean" );
      test.equals( jQuery.type(false), "boolean", "Boolean" );
      test.equals( jQuery.type(Boolean(true)), "boolean", "Boolean" );
      test.equals( jQuery.type(0), "number", "Number" );
      test.equals( jQuery.type(1), "number", "Number" );
      test.equals( jQuery.type(Number(1)), "number", "Number" );
      test.equals( jQuery.type(""), "string", "String" );
      test.equals( jQuery.type("a"), "string", "String" );
      test.equals( jQuery.type(String("a")), "string", "String" );
      test.equals( jQuery.type({}), "object", "Object" );
      test.equals( jQuery.type(/foo/), "regexp", "RegExp" );
      test.equals( jQuery.type(new RegExp("asdf")), "regexp", "RegExp" );
      test.equals( jQuery.type([1]), "array", "Array" );
      test.equals( jQuery.type(new Date()), "date", "Date" );
      // test.equals( jQuery.type(new Function("return;")), "function", "Function" );
      test.equals( jQuery.type(function(){}), "function", "Function" );
      test.equals( jQuery.type(window), "object", "Window" );
      test.equals( jQuery.type(document), "object", "Document" );
      test.equals( jQuery.type(document.body), "object", "Element" );
      test.equals( jQuery.type(document.createTextNode("foo")), "object", "TextNode" );
      test.equals( jQuery.type(document.getElementsByTagName("*")), "object", "NodeList" );
      test.done();
    },

    "isPlainObject": function(test) {

      var jQuery = ctx.$;
      var document = ctx.document;
      var window = ctx.window;

      test.expect(13);

      // The use case that we want to match
      test.ok(jQuery.isPlainObject({}), "{}");

      // Not objects shouldn't be matched
      test.ok(!jQuery.isPlainObject(""), "string");
      test.ok(!jQuery.isPlainObject(0) && !jQuery.isPlainObject(1), "number");
      test.ok(!jQuery.isPlainObject(true) && !jQuery.isPlainObject(false), "boolean");
      test.ok(!jQuery.isPlainObject(null), "null");
      test.ok(!jQuery.isPlainObject(undefined), "undefined");

      // Arrays shouldn't be matched
      test.ok(!jQuery.isPlainObject([]), "array");

      // Instantiated objects shouldn't be matched
      test.ok(!jQuery.isPlainObject(new Date()), "new Date");

      var Fn = function(){};

      // Functions shouldn't be matched
      test.ok(!jQuery.isPlainObject(Fn), "fn");

      // Again, instantiated objects shouldn't be matched
      test.ok(!jQuery.isPlainObject(new Fn()), "new fn (no methods)");

      // Makes the function a little more realistic
      // (and harder to detect, incidentally)
      Fn.prototype = {someMethod: function(){}};

      // Again, instantiated objects shouldn't be matched
      test.ok(!jQuery.isPlainObject(new Fn()), "new fn");

      // DOM Element
      test.ok(!jQuery.isPlainObject(document.createElement("div")), "DOM Element");

      // Window
      test.ok(!jQuery.isPlainObject(window), "window");

      /* XXX removed iframe test */
      test.done();
    },

    "isFunction": function(test) {

      var jQuery = ctx.$;
      var document = ctx.document;

      test.expect(19);

      // Make sure that false values return false
      test.ok( !jQuery.isFunction(), "No Value" );
      test.ok( !jQuery.isFunction( null ), "null Value" );
      test.ok( !jQuery.isFunction( undefined ), "undefined Value" );
      test.ok( !jQuery.isFunction( "" ), "Empty String Value" );
      test.ok( !jQuery.isFunction( 0 ), "0 Value" );

      // Check built-ins
      // Safari uses "(Internal Function)"
      test.ok( jQuery.isFunction(String), "String Function("+String+")" );
      test.ok( jQuery.isFunction(Array), "Array Function("+Array+")" );
      test.ok( jQuery.isFunction(Object), "Object Function("+Object+")" );
      test.ok( jQuery.isFunction(Function), "Function Function("+Function+")" );

      // When stringified, this could be misinterpreted
      var mystr = "function";
      test.ok( !jQuery.isFunction(mystr), "Function String" );

      // When stringified, this could be misinterpreted
      var myarr = [ "function" ];
      test.ok( !jQuery.isFunction(myarr), "Function Array" );

      // When stringified, this could be misinterpreted
      var myfunction = { "function": "test" };
      test.ok( !jQuery.isFunction(myfunction), "Function Object" );

      // Make sure normal functions still work
      var fn = function(){};
      test.ok( jQuery.isFunction(fn), "Normal Function" );

      var obj = document.createElement("object");

      // Firefox says this is a function
      test.ok( !jQuery.isFunction(obj), "Object Element" );

      // IE says this is an object
      // Since 1.3, this isn't supported (#2968)
      //test.ok( jQuery.isFunction(obj.getAttribute), "getAttribute Function" );

      var nodes = document.body.childNodes;

      // Safari says this is a function
      test.ok( !jQuery.isFunction(nodes), "childNodes Property" );

      var first = document.body.firstChild;

      // Normal elements are reported test.ok everywhere
      test.ok( !jQuery.isFunction(first), "A normal DOM Element" );

      var input = document.createElement("input");
      input.type = "text";
      document.body.appendChild( input );

      // IE says this is an object
      // Since 1.3, this isn't supported (#2968)
      //test.ok( jQuery.isFunction(input.focus), "A default function property" );

      document.body.removeChild( input );

      var a = document.createElement("a");
      a.href = "some-function";
      document.body.appendChild( a );

      // This serializes with the word 'function' in it
      test.ok( !jQuery.isFunction(a), "Anchor Element" );

      document.body.removeChild( a );

      // Recursive function calls have lengths and array-like properties
      function callme(callback){
        function fn(response){
          callback(response);
        }

        test.ok( jQuery.isFunction(fn), "Recursive Function Call" );

        fn({ some: "data" });
      }

      callme(function(){
        callme(function(){});
      });
      test.done();
    },

    "isXMLDoc - HTML": function(test) {

      var jQuery = ctx.$;
      var document = ctx.document;

      test.expect(4);

      test.ok( !jQuery.isXMLDoc( document ), "HTML document" );
      test.ok( !jQuery.isXMLDoc( document.documentElement ), "HTML documentElement" );
      test.ok( !jQuery.isXMLDoc( document.body ), "HTML Body Element" );

      var iframe = document.createElement("iframe");
      document.body.appendChild( iframe );

      try {
        var body = jQuery(iframe).contents()[0];

        try {
          test.ok( !jQuery.isXMLDoc( body ), "Iframe body element" );
        } catch(e) {
          test.ok( false, "Iframe body element exception" );
        }

      } catch(e) {
        test.ok( true, "Iframe body element - iframe not working correctly" );
      }

      test.done();
    }
  };
};