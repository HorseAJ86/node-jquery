module.exports = function(ctx) {

  'use strict';

  var q = ctx.q;
  var jsdom = ctx.jsdom;

  return {
    "text()": function(test) {

      var jQuery = ctx.$;

      test.expect(2);
      test.equals("Yahoo", jQuery("#yahoo").text(), "check for text in anchor");
      test.equals("Everything inside the red border is inside a div with id=\"foo\".", jQuery("#sndp").text(), "check for text in complex paragraph");
      test.done();
    },

    "end()": function(test) {

      var jQuery = ctx.$;

      test.expect(3);
      test.equals( 'Yahoo', jQuery('#yahoo').parent().end().text(), 'Check for end' );
      test.ok( jQuery('#yahoo').end(), 'Check for end with nothing to end' );

      var x = jQuery('#yahoo');
      x.parent();
      test.equals( 'Yahoo', jQuery('#yahoo').text(), 'Check for non-destructive behaviour' );
      test.done();
    },

    "length": function(test) {

      var jQuery = ctx.$;

      test.expect(1);
      test.equals( jQuery("#main p").length, 6, "Get Number of Elements Found" );
      test.done();
    },

    "size()": function(test) {

      var jQuery = ctx.$;

      test.expect(1);
      test.equals( jQuery("#main p").size(), 6, "Get Number of Elements Found" );
      test.done();
    },

    "get()": function(test) {

      var jQuery = ctx.$;

      test.expect(1);
      test.same( jQuery("#main p").get(), q("firstp","ap","sndp","en","sap","first"), "Get All Elements" );
      test.done();
    },

    "toArray()": function(test) {

      var jQuery = ctx.$;

      test.expect(1);
      test.same( jQuery("#main p").toArray(),
      q("firstp","ap","sndp","en","sap","first"),
      "Convert jQuery object to an Array" );
      test.done();
    },

    "get(Number)": function(test) {

      var jQuery = ctx.$;
      var document = ctx.document;

      test.expect(2);
      test.equals( jQuery("#main p").get(0), document.getElementById("firstp"), "Get A Single Element" );
      test.strictEqual( jQuery("#firstp").get(1), undefined, "Try get with index larger elements count" );
      test.done();
    },

    "get(-Number)": function(test) {

      var jQuery = ctx.$;
      var document = ctx.document;

      test.expect(2);
      test.equals( jQuery("p").get(-1), document.getElementById("first"), "Get a single element with negative index" );
      test.strictEqual( jQuery("#firstp").get(-2), undefined, "Try get with index negative index larger then elements count" );
      test.done();
    },

    "attr()": function(test) {

      var jQuery = ctx.$;

      var e = null;
      test.expect(4);
      test.equals( jQuery('#input1').attr('name'), 'PWD', "Get form element name attribute" );
      test.equals( jQuery('#input2').attr('name'), 'T1', "Get form element name attribute" );
      test.equals( jQuery('item').attr('name'), 'test val', "Get name attribute from element" );
      e = jsdom('<element name="dude" age="25">content</element>');
      test.equals( jQuery('element', e).attr('name'), 'dude', "Get name attribute from element" );
      test.done();
    }
  };
};
