module.exports = function(ctx) {

  'use strict';

  var q = ctx.q;

  return {

    "Basic requirements": function(test) {

      var jQuery, $;
      jQuery = $ = ctx.$;
      var document = ctx.document;

      test.expect(7);
      test.ok( Array.prototype.push, "Array.push()" );
      test.ok( Function.prototype.apply, "Function.apply()" );
      test.ok( document.getElementById, "getElementById" );
      test.ok( document.getElementsByTagName, "getElementsByTagName" );
      test.ok( RegExp, "RegExp" );
      test.ok( jQuery, "jQuery" );
      test.ok( $, "$" );
      test.done();
    },

    "jQuery()": function(test) {

      var jQuery = ctx.$;
      var window = ctx.window;
      var document = ctx.document;

      test.expect(24);
      // Basic constructor's behavior

      test.equals( jQuery().length, 0, "jQuery() === jQuery([])" );
      test.equals( jQuery(undefined).length, 0, "jQuery(undefined) === jQuery([])" );
      test.equals( jQuery(null).length, 0, "jQuery(null) === jQuery([])" );
      test.equals( jQuery("").length, 0, "jQuery('') === jQuery([])" );

      var obj = jQuery("div");
      test.equals( jQuery(obj).selector, "div", "jQuery(jQueryObj) == jQueryObj" );

      // can actually yield more than one, when iframes are included, the window is an array as well
      test.equals( jQuery(window).length, 1, "Correct number of elements generated for jQuery(window)" );


      var main = jQuery("#main");
      test.same( jQuery("div p", main).get(), q("sndp", "en", "sap"), "Basic selector with jQuery object as context" );

      /*
      // disabled since this test was doing nothing. i tried to fix it but i'm not sure
      // what the expected behavior should even be. FF returns "\n" for the text node
      // make sure this is handled
      var crlfContainer = jQuery('<p>\r\n</p>');
      var x = crlfContainer.contents().get(0).nodeValue;
      equals( x, what???, "Check for \\r and \\n in jQuery()" );
      */

      /* // Disabled until we add this functionality in
      var pass = true;
      try {
      jQuery("<div>Testing</div>").appendTo(document.getElementById("iframe").contentDocument.body);
      } catch(e){
      pass = false;
      }
      ok( pass, "jQuery('&lt;tag&gt;') needs optional document parameter to ease cross-frame DOM wrangling, see #968" );*/

      var code = jQuery("<code/>");
      test.equals( code.length, 1, "Correct number of elements generated for code" );
      test.equals( code.parent().length, 0, "Make sure that the generated HTML has no parent." );
      var img = jQuery("<img/>");
      test.equals( img.length, 1, "Correct number of elements generated for img" );
      test.equals( img.parent().length, 0, "Make sure that the generated HTML has no parent." );
      var div = jQuery("<div/><hr/><code/><b/>");
      test.equals( div.length, 4, "Correct number of elements generated for div hr code b" );
      test.equals( div.parent().length, 0, "Make sure that the generated HTML has no parent." );

      test.equals( jQuery([1,2,3]).get(1), 2, "Test passing an array to the factory" );

      test.equals( jQuery(document.body).get(0), jQuery('body').get(0), "Test passing an html node to the factory" );

      var exec = false;

      var elem = jQuery("<div/>", {
        width: 10,
        css: { paddingLeft:1, paddingRight:1 },
        click: function(){ test.ok(exec, "Click executed."); },
        text: "test",
        "class": "test2",
        id: "test3"
      });

      test.equals( elem[0].style.width, '10px', 'jQuery() quick setter width');
      test.equals( elem[0].style.paddingLeft, '1px', 'jQuery quick setter css');
      test.equals( elem[0].style.paddingRight, '1px', 'jQuery quick setter css');
      test.equals( elem[0].childNodes.length, 1, 'jQuery quick setter text');
      test.equals( elem[0].firstChild.nodeValue, "test", 'jQuery quick setter text');
      test.equals( elem[0].className, "test2", 'jQuery() quick setter class');
      test.equals( elem[0].id, "test3", 'jQuery() quick setter id');

      exec = true;
      elem.click();

      // manually clean up detached elements
      elem.remove();

      for ( var i = 0; i < 3; ++i ) {
        elem = jQuery("<input type='text' value='TEST' />");
      }
      test.equals( elem[0].defaultValue, "TEST", "Ensure cached nodes are cloned properly (Bug #6655)" );

      // manually clean up detached elements
      elem.remove();
      test.done();
    },

    "noConflict": function(test) {

      var jQuery, $;
      jQuery = $ = ctx.$;

      test.expect(7);

      var originaljQuery = jQuery,
      original$ = $,
      $$ = jQuery;

      test.equals( jQuery, jQuery.noConflict(), "noConflict returned the jQuery object" );
      test.equals( jQuery, $$, "Make sure jQuery wasn't touched." );
      test.equals( $, original$, "Make sure $ was reverted." );

      jQuery = $ = $$;

      test.equals( jQuery.noConflict(true), $$, "noConflict returned the jQuery object" );
      test.equals( jQuery, originaljQuery, "Make sure jQuery was reverted." );
      test.equals( $, original$, "Make sure $ was reverted." );
      test.ok( $$("#main").html("test"), "Make sure that jQuery still works." );

      jQuery = $$;
      test.done();
    }
  };
};