module.exports = function(ctx) {

  'use strict';

  var q = ctx.q;

  return {
    "slice()": function(test) {

      var jQuery = ctx.$;

      test.expect(7);

      var $links = jQuery("#ap a");

      test.same( $links.slice(1,2).get(), q("groups"), "slice(1,2)" );
      test.same( $links.slice(1).get(), q("groups", "anchor1", "mark"), "slice(1)" );
      test.same( $links.slice(0,3).get(), q("google", "groups", "anchor1"), "slice(0,3)" );
      test.same( $links.slice(-1).get(), q("mark"), "slice(-1)" );

      test.same( $links.eq(1).get(), q("groups"), "eq(1)" );
      test.same( $links.eq('2').get(), q("anchor1"), "eq('2')" );
      test.same( $links.eq(-1).get(), q("mark"), "eq(-1)" );
      test.done();
    },

    "each(Function)": function(test) {

      var jQuery = ctx.$;

      test.expect(1);

      var div = jQuery("div");
      div.each(function() {
        this.foo = 'zoo';
      });

      var pass = true;
      for ( var i = 0; i < div.size(); i++ ) {
        if ( div.get(i).foo !== "zoo" ) {
          pass = false;
        }
      }
      test.ok( pass, "Execute a function, Relative" );
      test.done();
    },

    "first()/last()": function(test) {

      var jQuery = ctx.$;

      test.expect(4);

      var $links = jQuery("#ap a"), $none = jQuery("asdf");

      test.same( $links.first().get(), q("google"), "first()" );
      test.same( $links.last().get(), q("mark"), "last()" );

      test.same( $none.first().get(), [], "first() none" );
      test.same( $none.last().get(), [], "last() none" );
      test.done();
    },

    "map()": function(test) {

      var jQuery = ctx.$;

      test.expect(2);//test.expect(6);

      test.same(
        jQuery("#ap").map(function() {
          return jQuery(this).find("a").get();
        }).get(),
        q("google", "groups", "anchor1", "mark"),
        "Array Map"
      );

      test.same(
        jQuery("#ap > a").map(function(){
          return this.parentNode;
        }).get(),
        q("ap","ap","ap"),
        "Single Map"
      );
      test.done();

      return;//these haven't been accepted yet

      // //for #2616
      // var keys = jQuery.map( {a:1,b:2}, function( v, k ){
      //  return k;
      // }, [ ] );

      // test.equals( keys.join(""), "ab", "Map the keys from a hash to an array" );

      // var values = jQuery.map( {a:1,b:2}, function( v, k ){
      //  return v;
      // }, [ ] );

      // test.equals( values.join(""), "12", "Map the values from a hash to an array" );

      // var scripts = document.getElementsByTagName("script");
      // var mapped = jQuery.map( scripts, function( v, k ){
      //  return v;
      // }, {length:0} );

      // test.equals( mapped.length, scripts.length, "Map an array(-like) to a hash" );

      // var flat = jQuery.map( Array(4), function( v, k ){
      //  return k % 2 ? k : [k,k,k];//try mixing array and regular returns
      // });

      // test.equals( flat.join(""), "00012223", "try the new flatten technique(#2616)" );
    },

    "jQuery.merge()": function(test) {

      var jQuery = ctx.$;

      test.expect(8);

      var parse = jQuery.merge;

      test.same( parse([],[]), [], "Empty arrays" );

      test.same( parse([1],[2]), [1,2], "Basic" );
      test.same( parse([1,2],[3,4]), [1,2,3,4], "Basic" );

      test.same( parse([1,2],[]), [1,2], "Second empty" );
      test.same( parse([],[1,2]), [1,2], "First empty" );

      // Fixed at [5998], #3641
      test.same( parse([-2,-1], [0,1,2]), [-2,-1,0,1,2], "Second array including a zero (falsy)");

      // After fixing #5527
      test.same( parse([], [null, undefined]), [null, undefined], "Second array including null and undefined values");
      test.same( parse({length:0}, [1,2]), {length:2, 0:1, 1:2}, "First array like");
      test.done();
    },

    "jQuery.each(Object,Function)": function(test) {

      var jQuery = ctx.$;

      test.expect(13);

      jQuery.each( [0,1,2], function(i, n){
        test.equals( i, n, "Check array iteration" );
      });

      jQuery.each( [5,6,7], function(i, n){
        test.equals( i, n - 5, "Check array iteration" );
      });

      jQuery.each( { name: "name", lang: "lang" }, function(i, n) {
        test.equals( i, n, "Check object iteration" );
      });

      var total = 0;
      jQuery.each([1,2,3], function(i,v) {
        total += v;
      });
      test.equals( total, 6, "Looping over an array" );
      total = 0;
      jQuery.each([1,2,3], function(i,v) {
        total += v;
        if ( i === 1 ) {
          return false;
        }
      });
      test.equals( total, 3, "Looping over an array, with break" );
      total = 0;
      jQuery.each({"a":1,"b":2,"c":3}, function(i,v){
        total += v;
      });
      test.equals( total, 6, "Looping over an object" );
      total = 0;
      jQuery.each({"a":3,"b":3,"c":3}, function(i,v){
        total += v;
        return false;
      });
      test.equals( total, 3, "Looping over an object, with break" );

      var f = function(){};
      f.foo = 'bar';
      jQuery.each(f, function(i){
        f[i] = 'baz';
      });
      test.equals( "baz", f.foo, "Loop over a function" );
      test.done();
    },

    "jQuery.makeArray": function(test) {

      var jQuery = ctx.$;
      var document = ctx.document;
      var window = ctx.window;

      test.expect(17);

      test.equals( jQuery.makeArray(jQuery('html>*'))[0].nodeName.toUpperCase(), "HEAD", "Pass makeArray a jQuery object" );

      test.equals( jQuery.makeArray(document.getElementsByName("PWD")).slice(0,1)[0].name, "PWD", "Pass makeArray a nodelist" );

      test.equals( (function(){ return jQuery.makeArray(arguments); })(1,2).join(""), "12", "Pass makeArray an arguments array" );

      test.equals( jQuery.makeArray([1,2,3]).join(""), "123", "Pass makeArray a real array" );

      test.equals( jQuery.makeArray().length, 0, "Pass nothing to makeArray and test.expect an empty array" );

      test.equals( jQuery.makeArray( 0 )[0], 0 , "Pass makeArray a number" );

      test.equals( jQuery.makeArray( "foo" )[0], "foo", "Pass makeArray a string" );

      test.equals( jQuery.makeArray( true )[0].constructor, Boolean, "Pass makeArray a boolean" );

      test.equals( jQuery.makeArray( document.createElement("div") )[0].nodeName.toUpperCase(), "DIV", "Pass makeArray a single node" );

      test.equals( jQuery.makeArray( {length:2, 0:"a", 1:"b"} ).join(""), "ab", "Pass makeArray an array like map (with length)" );

      test.ok( !!jQuery.makeArray( document.documentElement.childNodes ).slice(0,1)[0].nodeName, "Pass makeArray a childNodes array" );

      // function, is tricky as it has length
      test.equals( jQuery.makeArray( function(){ return 1;} )[0](), 1, "Pass makeArray a function" );

      //window, also has length
      test.equals( jQuery.makeArray(window)[0], window, "Pass makeArray the window" );

      test.equals( jQuery.makeArray(/a/)[0].constructor, RegExp, "Pass makeArray a regex" );

      test.equals( jQuery.makeArray(document.getElementById('form')).length, 2, "Pass makeArray a form (treat as elements)" );

      // For #5610
      test.same( jQuery.makeArray({'length': '0'}), [], "Make sure object is coerced properly.");
      test.same( jQuery.makeArray({'length': '5'}), [], "Make sure object is coerced properly.");
      test.done();
    }
  };
};