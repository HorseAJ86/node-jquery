module.exports = function(ctx) {

  'use strict';

  return {
    "selector state": function(test) {

      var jQuery = ctx.$;
      var document = ctx.document;

      test.expect(31);

      var elem;

      elem = jQuery(undefined);
      test.equals( elem.selector, "", "Empty jQuery Selector" );
      test.equals( elem.context, undefined, "Empty jQuery Context" );

      elem = jQuery(document);
      test.equals( elem.selector, "", "Document Selector" );
      test.equals( elem.context, document, "Document Context" );

      elem = jQuery(document.body);
      test.equals( elem.selector, "", "Body Selector" );
      test.equals( elem.context, document.body, "Body Context" );

      elem = jQuery("#main");
      test.equals( elem.selector, "#main", "#main Selector" );
      test.equals( elem.context, document, "#main Context" );

      elem = jQuery("#notfoundnono");
      test.equals( elem.selector, "#notfoundnono", "#notfoundnono Selector" );
      test.equals( elem.context, document, "#notfoundnono Context" );

      elem = jQuery("#main", document);
      test.equals( elem.selector, "#main", "#main Selector" );
      test.equals( elem.context, document, "#main Context" );

      elem = jQuery("#main", document.body);
      test.equals( elem.selector, "#main", "#main Selector" );
      test.equals( elem.context, document.body, "#main Context" );

      // Test cloning
      elem = jQuery(elem);
      test.equals( elem.selector, "#main", "#main Selector" );
      test.equals( elem.context, document.body, "#main Context" );

      elem = jQuery(document.body).find("#main");
      test.equals( elem.selector, "#main", "#main find Selector" );
      test.equals( elem.context, document.body, "#main find Context" );

      elem = jQuery("#main").filter("div");
      test.equals( elem.selector, "#main.filter(div)", "#main filter Selector" );
      test.equals( elem.context, document, "#main filter Context" );

      elem = jQuery("#main").not("div");
      test.equals( elem.selector, "#main.not(div)", "#main not Selector" );
      test.equals( elem.context, document, "#main not Context" );

      elem = jQuery("#main").filter("div").not("div");
      test.equals( elem.selector, "#main.filter(div).not(div)", "#main filter, not Selector" );
      test.equals( elem.context, document, "#main filter, not Context" );

      elem = jQuery("#main").filter("div").not("div").end();
      test.equals( elem.selector, "#main.filter(div)", "#main filter, not, end Selector" );
      test.equals( elem.context, document, "#main filter, not, end Context" );

      elem = jQuery("#main").parent("body");
      test.equals( elem.selector, "#main.parent(body)", "#main parent Selector" );
      test.equals( elem.context, document, "#main parent Context" );

      elem = jQuery("#main").eq(0);
      test.equals( elem.selector, "#main.slice(0,1)", "#main eq Selector" );
      test.equals( elem.context, document, "#main eq Context" );

      var d = "<div />";
      test.equals(
        jQuery(d).appendTo(jQuery(d)).selector,
        jQuery(d).appendTo(d).selector,
        "manipulation methods make same selector for jQuery objects"
      );
      test.done();
    }
  };
};