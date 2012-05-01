var testCase = require('nodeunit').testCase;


// need to be global as helpers access these variables
window = document = jQuery = $ = null;

var helpers = require('./helpers/helper'),
q = helpers.query_ids;

module.exports = testCase({
  setUp: function(callback) {
		jQuery = $ =  helpers.recreate_doc(null);
		callback();
  },
  XMLHttpRequest: function(test) {
    $.ajax({
      url: 'http://localhost:8000/xmlhttp.json',
      success: function(d) {
        console.log(d);
        test.done();
      },
      error: function(d) {
        console.log(d);
        console.log('fail');
        test.done();
      } 
    });
    

    
  }  
});
