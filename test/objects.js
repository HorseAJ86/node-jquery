module.exports = function(ctx) {

  'use strict';

  return {
    "jQuery.extend(Object, Object)": function(test) {

      var jQuery = ctx.$;
      var document = ctx.document;

      test.expect(28);

      var settings = { xnumber1: 5, xnumber2: 7, xstring1: "peter", xstring2: "pan" },
      options = { xnumber2: 1, xstring2: "x", xxx: "newstring" },
      optionsCopy = { xnumber2: 1, xstring2: "x", xxx: "newstring" },
      merged = { xnumber1: 5, xnumber2: 1, xstring1: "peter", xstring2: "x", xxx: "newstring" },
      deep1 = { foo: { bar: true } },
      // deep1copy = { foo: { bar: true } },
      deep2 = { foo: { baz: true }, foo2: document },
      deep2copy = { foo: { baz: true }, foo2: document },
      deepmerged = { foo: { bar: true, baz: true }, foo2: document },
      arr = [1, 2, 3],
      nestedarray = { arr: arr };

      jQuery.extend(settings, options);
      test.same( settings, merged, "Check if extended: settings must be extended" );
      test.same( options, optionsCopy, "Check if not modified: options must not be modified" );

      jQuery.extend(settings, null, options);
      test.same( settings, merged, "Check if extended: settings must be extended" );
      test.same( options, optionsCopy, "Check if not modified: options must not be modified" );

      jQuery.extend(true, deep1, deep2);
      test.same( deep1.foo, deepmerged.foo, "Check if foo: settings must be extended" );
      test.same( deep2.foo, deep2copy.foo, "Check if not deep2: options must not be modified" );
      test.equals( deep1.foo2, document, "Make sure that a deep clone was not attempted on the document" );

      test.ok( jQuery.extend(true, {}, nestedarray).arr !== arr, "Deep extend of object must clone child array" );

      // #5991
      test.ok( jQuery.isArray( jQuery.extend(true, { arr: {} }, nestedarray).arr ), "Cloned array heve to be an Array" );
      test.ok( jQuery.isPlainObject( jQuery.extend(true, { arr: arr }, { arr: {} }).arr ), "Cloned object heve to be an plain object" );

      var empty = {};
      var optionsWithLength = { foo: { length: -1 } };
      jQuery.extend(true, empty, optionsWithLength);
      test.same( empty.foo, optionsWithLength.foo, "The length property must copy correctly" );

      empty = {};
      var optionsWithDate = { foo: { date: new Date() } };
      jQuery.extend(true, empty, optionsWithDate);
      test.same( empty.foo, optionsWithDate.foo, "Dates copy correctly" );

      var MyKlass = function() {};
      var customObject = new MyKlass();
      var optionsWithCustomObject = { foo: { date: customObject } };
      empty = {};
      jQuery.extend(true, empty, optionsWithCustomObject);
      test.ok( empty.foo && empty.foo.date === customObject, "Custom objects copy correctly (no methods)" );

      // Makes the class a little more realistic
      MyKlass.prototype = { someMethod: function(){} };
      empty = {};
      jQuery.extend(true, empty, optionsWithCustomObject);
      test.ok( empty.foo && empty.foo.date === customObject, "Custom objects copy correctly" );

      var ret = jQuery.extend(true, { foo: 4 }, { foo: 5 } );
      test.ok( ret.foo === 5, "Wrapped numbers copy correctly" );

      var nullUndef;
      nullUndef = jQuery.extend({}, options, { xnumber2: null });
      test.ok( nullUndef.xnumber2 === null, "Check to make sure null values are copied");

      nullUndef = jQuery.extend({}, options, { xnumber2: undefined });
      test.ok( nullUndef.xnumber2 === options.xnumber2, "Check to make sure undefined values are not copied");

      nullUndef = jQuery.extend({}, options, { xnumber0: null });
      test.ok( nullUndef.xnumber0 === null, "Check to make sure null values are inserted");

      var target = {};
      var recursive = { foo:target, bar:5 };
      jQuery.extend(true, target, recursive);
      test.same( target, { bar:5 }, "Check to make sure a recursive obj doesn't go never-ending loop by not copying it over" );

      ret = jQuery.extend(true, { foo: [] }, { foo: [0] } ); // 1907
      test.equals( ret.foo.length, 1, "Check to make sure a value with coersion 'false' copies over when necessary to fix #1907" );

      ret = jQuery.extend(true, { foo: "1,2,3" }, { foo: [1, 2, 3] } );
      test.ok( typeof ret.foo !== "string", "Check to make sure values equal with coersion (but not actually equal) overwrite correctly" );

      ret = jQuery.extend(true, { foo:"bar" }, { foo:null } );
      test.ok( typeof ret.foo !== 'undefined', "Make sure a null value doesn't crash with deep extend, for #1908" );

      var obj = { foo:null };
      jQuery.extend(true, obj, { foo:"notnull" } );
      test.equals( obj.foo, "notnull", "Make sure a null value can be overwritten" );

      function func() {}
      jQuery.extend(func, { key: "value" } );
      test.equals( func.key, "value", "Verify a function can be extended" );

      var defaults = { xnumber1: 5, xnumber2: 7, xstring1: "peter", xstring2: "pan" },
      defaultsCopy = { xnumber1: 5, xnumber2: 7, xstring1: "peter", xstring2: "pan" },
      options1 = { xnumber2: 1, xstring2: "x" },
      options1Copy = { xnumber2: 1, xstring2: "x" },
      options2 = { xstring2: "xx", xxx: "newstringx" },
      options2Copy = { xstring2: "xx", xxx: "newstringx" },
      merged2 = { xnumber1: 5, xnumber2: 1, xstring1: "peter", xstring2: "xx", xxx: "newstringx" };

      settings = jQuery.extend({}, defaults, options1, options2);
      test.same( settings, merged2, "Check if extended: settings must be extended" );
      test.same( defaults, defaultsCopy, "Check if not modified: options1 must not be modified" );
      test.same( options1, options1Copy, "Check if not modified: options1 must not be modified" );
      test.same( options2, options2Copy, "Check if not modified: options2 must not be modified" );
      test.done();
    },
    "jQuery.isEmptyObject": function(test) {

      var jQuery = ctx.$;

      test.expect(2);

      test.equals(true, jQuery.isEmptyObject({}), "isEmptyObject on empty object literal" );
      test.equals(false, jQuery.isEmptyObject({a:1}), "isEmptyObject on non-empty object literal" );

      // What about this ?
      // test.equals(true, jQuery.isEmptyObject(null), "isEmptyObject on null" );
      test.done();
    }
  };
};