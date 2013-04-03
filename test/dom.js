module.exports = function(ctx) {

  'use strict';

  var jsdom = ctx.jsdom;

  return {
    "jQuery('html')": function(test) {

      var jQuery = ctx.$;

      test.expect(15);

      jQuery.foo = false;
      var s = jQuery("<script>jQuery.foo='test';</script>")[0];
      test.ok( s, "Creating a script" );
      test.ok( !jQuery.foo, "Make sure the script wasn't executed prematurely" );
      jQuery("body").append("<script>jQuery.foo='test';</script>");
      test.ok( jQuery.foo, "Executing a scripts contents in the right context" );

      // Test multi-line HTML
      var div = jQuery("<div>\r\nsome text\n<p>some p</p>\nmore text\r\n</div>")[0];
      test.equals( div.nodeName.toUpperCase(), "DIV", "Make sure we're getting a div." );
      test.equals( div.firstChild.nodeType, 3, "Text node." );
      test.equals( div.lastChild.nodeType, 3, "Text node." );
      test.equals( div.childNodes[1].nodeType, 1, "Paragraph." );
      test.equals( div.childNodes[1].firstChild.nodeType, 3, "Paragraph text." );

      test.ok( jQuery("<link rel='stylesheet'/>")[0], "Creating a link" );

      test.ok( !jQuery("<script/>")[0].parentNode, "Create a script" );

      test.ok( jQuery("<input/>").attr("type", "hidden"), "Create an input and set the type." );

      var j = jQuery("<span>hi</span> there <!-- mon ami -->");
      test.ok( j.length >= 2, "Check node,textnode,comment creation (some browsers delete comments)" );

      test.ok( !jQuery("<option>test</option>")[0].selected, "Make sure that options are auto-selected #2050" );

      test.ok( jQuery("<div></div>")[0], "Create a div with closing tag." );
      test.ok( jQuery("<table></table>")[0], "Create a table with closing tag." );

      test.done();
    },

    "create script tag": function (test) {

      var jQuery = ctx.$;

      var src = null, dom;
      test.expect(1);
      dom = jsdom('<script src="none.js" type="text/javascript"></script>');
      src = jQuery('script', dom).attr('src');
      test.equals(src, 'none.js', 'script should return proper src attribute');
      test.done();
    },

    "jQuery('html', context)": function(test) {

      var jQuery = ctx.$;

      test.expect(1);

      var $div = jQuery("<div/>")[0];
      var $span = jQuery("<span/>", $div);
      test.equals($span.length, 1, "Verify a span created with a div context works, #1763");
      test.done();
    }
  };
};