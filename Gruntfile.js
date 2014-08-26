module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    nodemon: {
      dev: {
        script: 'server/server.js',
        options: {
          ignoredFiles: [ 'README.md', 'node_modules/**' ],
          delayTime: 300,
          watch: [ 'server' ],
          callback: function(nodemon) {
            nodemon.on('log', function(event) {
              console.log(event.colour);
            });
          }
        }
      },
      exec: {
        options: {
          exec: 'less'
        }
      }
    },  
    
    karma: {
	  unit: {
		configFile: 'test/karma.conf.js'
	  }
	}
  });

  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('test', ['jshint', 'mochaTest' ]);
  grunt.registerTask('server', ['nodemon:dev']);

};
