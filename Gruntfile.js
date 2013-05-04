var fs = require('fs');
var path = require('path');
var http = require('http');

module.exports = function(grunt) {

  var async = grunt.util.async;
  var log = grunt.log;

  // Available versions of jQuery on CDN
  var jQVersions = ['1.6.4', '1.7.2', '1.8.3', '1.9.1', '2.0.0'];
  var cdnHost = 'code.jquery.com';
  var destDir = path.join(__dirname, 'src');

  function fetchjQuery(jQVersion, callback) {

    var name = 'jquery-' + jQVersion + '.js';
    var filePath = path.join(destDir, name);

    // If file already exists, then don't download it again
    if(fs.existsSync(filePath)) {
      log.writeln('\u25e6', name);
      setTimeout(callback, 100);
      return;
    }

    // Stream the response in to files
    var stream = fs.createWriteStream(filePath, {
      'encoding': 'utf8'
    });

    http.request({
      'host': cdnHost,
      'path': '/' + name,
      'headers': {
        'Host': cdnHost
      }
    }, function(response) {
      response.setEncoding('utf8');
      response.on('data', stream.write.bind(stream));
      response.on('end', function() {
        stream.end();
        log.writeln('\u2713', name);
        setTimeout(callback, 100);
      });
      response.on('error', function(e) {
        log.writeln('error', e, name);
      });
    }).end();
  }

  grunt.registerTask('download', 'Download jQuery versions from CDN', function() {
    // This task is async
    var done = this.async();
    async.forEach(jQVersions, fetchjQuery, done);
  });

  // Project configuration.
  grunt.initConfig({
    'pkg': grunt.file.readJSON('package.json'),
    'nodeunit': {
      'files': 'test/index.js'
    },
    'watch': {
      'files': ['test/**/*.js'],
      'tasks': ['nodeunit'],
      'options': {
        'debounceDelay': 250
      }
    },
    'jshint': {
      'files': ['Gruntfile.js', 'lib/**/*.js', 'test/**/*.js'],
      'options': {
        'jshintrc': '.jshintrc'
      }
    }
  });

  // Load grunt plugins
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Register tasks.
  grunt.registerTask('default', ['jshint', 'download', 'nodeunit']);

  // Alias "test" to "nodeunit"
  grunt.registerTask('test', ['nodeunit']);

};
