module.exports = function(ctx) {

  'use strict';

  return {
    "jQuery.proxy": function(test){

      var jQuery = ctx.$;

      test.expect(4);

      var testfn = function() {
        test.equals( this, thisObject, "Make sure that scope is set properly." );
      };
      var thisObject = { foo: "bar", method: testfn };

      // Make sure normal works
      testfn.call( thisObject );

      // Basic scoping
      jQuery.proxy( testfn, thisObject )();

      // Make sure it doesn't freak out
      test.equals( jQuery.proxy( null, thisObject ), undefined, "Make sure no function was returned." );

      // Use the string shortcut
      jQuery.proxy( thisObject, "method" )();
      test.done();
    },

    "trim": function(test) {

      var jQuery = ctx.$;

      test.expect(9);

      var nbsp = String.fromCharCode(160);

      test.equals( jQuery.trim("hello  "), "hello", "trailing space" );
      test.equals( jQuery.trim("  hello"), "hello", "leading space" );
      test.equals( jQuery.trim("  hello   "), "hello", "space on both sides" );
      test.equals( jQuery.trim("  " + nbsp + "hello  " + nbsp + " "), "hello", "&nbsp;" );

      test.equals( jQuery.trim(), "", "Nothing in." );
      test.equals( jQuery.trim( undefined ), "", "Undefined" );
      test.equals( jQuery.trim( null ), "", "Null" );
      test.equals( jQuery.trim( 5 ), "5", "Number" );
      test.equals( jQuery.trim( false ), "false", "Boolean" );
      test.done();
    },

    "jQuery.parseJSON": function(test){

      var jQuery = ctx.$;

      test.expect(8);

      test.equals( jQuery.parseJSON(), null, "Nothing in, null out." );
      test.equals( jQuery.parseJSON( null ), null, "Nothing in, null out." );
      test.equals( jQuery.parseJSON( "" ), null, "Nothing in, null out." );

      test.same( jQuery.parseJSON("{}"), {}, "Plain object parsing." );
      test.same( jQuery.parseJSON('{"test":1}'), {"test":1}, "Plain object parsing." );

      test.same( jQuery.parseJSON('\n{"test":1}'), {"test":1}, "Make sure leading whitespaces are handled." );

      try {
        jQuery.parseJSON("{a:1}");
        test.ok( false, "Test malformed JSON string." );
      } catch( e ) {
        test.ok( true, "Test malformed JSON string." );
      }

      try {
        jQuery.parseJSON("{'a':1}");
        test.ok( false, "Test malformed JSON string." );
      } catch( e ) {
        test.ok( true, "Test malformed JSON string." );
      }
      test.done();
    }
  };
};