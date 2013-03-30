/*
 * grunt-module
 * https://github.com/reputation.com/grunt-module
 *
 * Copyright (c) 2012 Reputation.com
 * Authored by: Jeff Harnois jeff.harnois@reputation.com
 * Licensed under the MIT license.
 *
 */

'use strict';

var util = require('util');

module.exports = function(grunt) {
  grunt.registerMultiTask('modules', 'Add a module to a file.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      force: true
    });

    if (this.target[this.target.length - 1] === '/') {
      grunt.fail.warn("never use path as filename");
    }

    grunt.verbose.writeflags(options, 'Options');

    var i = 0,
    processModule = function(src, dest) {
      try {
        var module = src.name,
            files = src.files,
            views = [], 
            templates = [],
            models = [], 
            collections = [],
            routers = [],
            raw,
            origContents = 'define([\n  ""\n],\n\nfunction() {\n\n  // Create a new module.\n  var ' + module + ' = main.module();\n',
            contents = origContents;


        for (var i in files) {
          if (i === "views") {
            if (files[i] !== '') {
              views.push(files[i]);
            }
          } else if (i === "templates") {
            if (files[i] !== '') {
              templates.push(files[i]);
            }
          } else if (i === "collections") {
            if (files[i] !== '') {
              collections.push(files[i]);
            }
          } else if (i === "routers") {
            if (files[i] !== '') {
              routers.push(files[i]);
            }
          } else if (i === "models") {
            if (files[i] !== '') {
              models.push(files[i]);
            }
          }
        }

        if (routers[0].length > 0) {
          for (i=0; i < routers[0].length; i++) {
              raw = grunt.file.read(routers[0][i]);
              contents += raw + '\n\n';
          }
        }

        if (collections[0].length > 0) {
          for (i=0; i < collections[0].length; i++) {
              raw = grunt.file.read(collections[0][i]);
              contents += module + ".Collection." + raw + '\n\n';
          }
        }
        
        if (models[0].length > 0) {
          for (i=0; i < models[0].length; i++) {
              raw = grunt.file.read(models[0][i]);
              contents += module + ".Model." + raw + '\n\n';
          }
        }
        
        if (views[0].length > 0) {
          for (i=0; i < views[0].length; i++) {
              raw = grunt.file.read(views[0][i]);
              contents += module + ".Views." + raw + '\n\n';
          }
        }

        if (contents !== origContents) {
          contents += '  // Return the module for AMD compliance.\n  return '+module+';\n\n});\n\n';
        }

        if (templates[0].length > 0) {
          for (i=0; i < templates[0].length; i++) {
              raw = grunt.file.read(templates[0][i]);
              contents += raw;
          }
        }
        grunt.file.write(dest, contents);
      } catch (e) {
        grunt.log.error();
        grunt.verbose.error(e);
        grunt.fail.warn('Module operation failed');
      }

    },
    processTask = function(files) {
      for (i = 0; i < files.orig.src.length; i++) {
        processModule(files.orig.src[i], files.dest);
      }
    };

    for (i = 0; i < this.files.length; i++) {
      console.log('foreach');
      processTask(this.files[i]);
    }
  });
};