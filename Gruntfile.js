module.exports = function(grunt) {

  // Public tasks
  // -------------------------------------------------------------------------
  grunt.registerTask('default', ['server', 'watch']);

  // External Task Configuration
  // -------------------------------------------------------------------------
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Build Configuration
  // -------------------------------------------------------------------------
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    watch: {
      all: {
        files: [ 'public/**/*' ],
        tasks: [  ]
      }
    },
  });

  // Custom Tasks
  // -------------------------------------------------------------------------
  grunt.registerTask('server', 'Start the custom server', function() {
    grunt.log.writeln('Started web server on port 3000...');
    require('./server.js').listen(3000);
  });

};