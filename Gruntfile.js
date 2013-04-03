module.exports = function(grunt) {

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
  grunt.registerTask('default', ['jshint', 'nodeunit']);

};
