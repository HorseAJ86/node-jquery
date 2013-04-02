module.exports = function(grunt) {

  // Load grunt plugins
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',
    nodeunit: {
      all: ['test/*.js']
    },
    watch: {
      files: '<config:jshint.files>',
      tasks: 'default'
    },
    jshint: {
      all: ['Gruntfile.js', 'lib/**/*.js', 'test/**/*.js'],
      options: {
        jshintrc: '.jshintrc'
      }
    }
  });

  // Register tasks.
  grunt.registerTask('test', 'nodeunit');
  grunt.registerTask('default', 'jshint test');

};
