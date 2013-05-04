module.exports = function(ctx) {

  'use strict';

  return {
    "jQuery.sub() - Static Methods": function(test) {

      var jQuery = ctx.$;
      var document = ctx.document;

      if(jQuery.fn.jquery > '1.8.2') {
        test.done();
        return;
      }

      test.expect(18);

      var subclass = ctx.jQuery.sub();

      subclass.extend({
        'topLevelMethod': function() {
          return this.debug;
        },
        'debug': false,
        'config': {
          'locale': 'en_US'
        },
        'setup': function(config) {
          this.extend(true, this.config, config);
        }
      });

      subclass.fn.extend({
        'subClassMethod': function() {
          return this;
        }
      });

      //Test Simple Subclass
      test.ok(subclass.topLevelMethod() === false, 'Subclass.topLevelMethod thought debug was true');
      test.ok(subclass.config.locale === 'en_US', subclass.config.locale + ' is wrong!');
      test.same(subclass.config.test, undefined, 'Subclass.config.test is set incorrectly');
      test.equal(jQuery.ajax, subclass.ajax, 'The subclass failed to get all top level methods');

      //Create a SubSubclass
      var subSubclass = subclass.sub();

      //Make Sure the SubSubclass inherited properly
      test.ok(subSubclass.topLevelMethod() === false, 'SubSubclass.topLevelMethod thought debug was true');
      test.ok(subSubclass.config.locale === 'en_US', subSubclass.config.locale + ' is wrong!');
      test.same(subSubclass.config.test, undefined, 'SubSubclass.config.test is set incorrectly');
      test.equal(jQuery.ajax, subSubclass.ajax, 'The subsubclass failed to get all top level methods');

      //Modify The Subclass and test the Modifications
      subSubclass.fn.extend({subSubClassMethod: function() { return this;}});
      subSubclass.setup({locale: 'es_MX', test: 'worked'});
      subSubclass.debug = true;
      subSubclass.ajax = function() {return false;};
      test.ok(subSubclass.topLevelMethod(), 'SubSubclass.topLevelMethod thought debug was false');
      test.same(subSubclass(document).subClassMethod, subclass.fn.subClassMethod, 'Methods Differ!');
      test.ok(subSubclass.config.locale === 'es_MX', subSubclass.config.locale + ' is wrong!');
      test.ok(subSubclass.config.test === 'worked', 'SubSubclass.config.test is set incorrectly');
      test.notEqual(jQuery.ajax, subSubclass.ajax, 'The subsubclass failed to get all top level methods');

      //This shows that the modifications to the SubSubClass did not bubble back up to it's superclass
      test.ok(subclass.topLevelMethod() === false, 'Subclass.topLevelMethod thought debug was true');
      test.ok(subclass.config.locale === 'en_US', subclass.config.locale + ' is wrong!');
      test.same(subclass.config.test, undefined, 'Subclass.config.test is set incorrectly');
      test.same(subclass(document).subSubClassMethod, undefined, 'subSubClassMethod set incorrectly');
      test.equal(jQuery.ajax, subclass.ajax, 'The subclass failed to get all top level methods');
      test.done();
    },

    "jQuery.sub() - .fn Methods": function(test) {

      var jQuery = ctx.$;
      var document = ctx.document;

      if(jQuery.fn.jquery > '1.8.2') {
        test.done();
        return;
      }

      test.expect(378);

      var subclass = jQuery.sub(),
      subclassSubclass = subclass.sub(),
      jQueryDocument = jQuery(document),
      selectors, contexts, methods, method, arg, description;

      jQueryDocument.toString = function(){ return 'jQueryDocument'; };

      subclass.fn.subclassMethod = function(){};
      subclassSubclass.fn.subclassSubclassMethod = function(){};

      selectors = [
        'body',
        'html, body',
        '<div></div>'
      ];

      methods = [ // all methods that return a new jQuery instance
        ['eq', 1],
        ['add', document],
        ['end'],
        ['has'],
        ['closest', 'div'],
        ['filter', document],
        ['find', 'div']
      ];

      contexts = [undefined, document, jQueryDocument];

      jQuery.each(selectors, function(i, selector){

        jQuery.each(methods, function(){
          method = this[0];
          arg = this[1];

          jQuery.each(contexts, function(i, context){

            description = '("'+selector+'", '+context+').'+method+'('+(arg||'')+')';

            test.same(
              jQuery(selector, context)[method](arg).subclassMethod, undefined,
              'jQuery'+description+' doesnt have Subclass methods'
            );
            test.same(
              jQuery(selector, context)[method](arg).subclassSubclassMethod, undefined,
              'jQuery'+description+' doesnt have SubclassSubclass methods'
            );
            test.same(
              subclass(selector, context)[method](arg).subclassMethod, subclass.fn.subclassMethod,
              'Subclass'+description+' has Subclass methods'
            );
            test.same(
              subclass(selector, context)[method](arg).subclassSubclassMethod, undefined,
              'Subclass'+description+' doesnt have SubclassSubclass methods'
            );
            test.same(
              subclassSubclass(selector, context)[method](arg).subclassMethod, subclass.fn.subclassMethod,
              'SubclassSubclass'+description+' has Subclass methods'
            );
            test.same(
              subclassSubclass(selector, context)[method](arg).subclassSubclassMethod, subclassSubclass.fn.subclassSubclassMethod,
              'SubclassSubclass'+description+' has SubclassSubclass methods'
            );

          });
        });
      });
      test.done();
    }
  };
};