/* jshint globalstrict: true */
/* global module, require */
'use strict';

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  grunt.initConfig({
    meta: {
      dist: 'dist',
      src: 'src',
      pkg: grunt.file.readJSON('package.json'),
      banner: '/*\n\t<%= meta.pkg.name %> v<%= meta.pkg.version %>\n\t<%= meta.pkg.homepage %>\n\n\t(c) <%= grunt.template.today("yyyy") %> <%= meta.pkg.author.name %> <<%= meta.pkg.author.email %>> (<%= meta.pkg.author.url %>)\n*/\n'
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish'),
        ignores: [
          '<%= meta.dist %>'
        ]
      },
      all: [
        'Gruntfile.js',
        'src/**/*.js'
      ]
    },
    uglify: {
      dist: {
        files: {
          '<%= meta.dist %>/angular-clock.min.js': '<%= meta.dist %>/angular-clock.js'
        }
      }
    },
    clean: {
      dist: ['<%= meta.dist %>']
    },
    usebanner: {
      dist: {
        options: {
          position: 'top',
          banner: '<%= meta.banner %>'
        },
        files: {
          src: ['<%= meta.dist %>/**.*js']
        }
      }
    },
    concat: {
      dist: {
        src: ['<%= meta.src %>/constants.js', '<%= meta.src %>/services.js', '<%= meta.src %>/directives.js', '<%= meta.src %>/bootstrap.js'],
        dest: '<%= meta.dist %>/angular-clock.js'
      }
    },
    watch: {
      js: {
        files: ['src/**/*.js'],
        tasks: ['build']
      }
    }
  });

  grunt.registerTask('default', [
    'watch'
  ]);

  grunt.registerTask('build', [
    'jshint:all',
    'clean:dist',
    'concat:dist',
    'uglify:dist',
    'usebanner:dist'
  ]);
};
