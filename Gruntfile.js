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
      tmp: '.tmp',
      pkg: grunt.file.readJSON('package.json'),
      banner: [
        '/*',
        ' * <%= meta.pkg.name %> v<%= meta.pkg.version %>',
        ' * <%= meta.pkg.homepage %>',
        ' * ',
        ' * (c) <%= grunt.template.today("yyyy") %> <%= meta.pkg.author.name %> <<%= meta.pkg.author.email %>> (<%= meta.pkg.author.url %>)',
        '*/',
        ''].join('\n')
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
      prepare: {
        options: {
          process: function (src) {
            // Format & remove all 'use strict'; statements.
            return '\t' + src
                    .replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1')
                    .replace(/\n/g, '\n\t');
          }
        },
        src: ['<%= meta.src %>/**/*.js'],
        dest: '<%= meta.tmp %>/angular-clock.js'
      },
      dist: {
        src: ['./intro', '<%= meta.tmp %>/angular-clock.js', './outro'],
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
    'concat:prepare',
    'concat:dist',
    'uglify:dist',
    'usebanner:dist'
  ]);
};
