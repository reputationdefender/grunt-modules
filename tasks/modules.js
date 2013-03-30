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
        var files = src.files,
            views, 
            templates,
            models, 
            collections,
            routers,
            module,
            raw,
            contents = '',
            origContents = '';


        for (var i in files) {
          if (i === "views") {
            if (files[i] !== '') {
              views = files[i];
            }
          } else if (i === "templates") {
            if (files[i] !== '') {
              templates = files[i];
            }
          } else if (i === "collections") {
            if (files[i] !== '') {
              collections = files[i];
            }
          } else if (i === "routers") {
            if (files[i] !== '') {
              routers = files[i];
            }
          } else if (i === "models") {
            if (files[i] !== '') {
              models = files[i];
            }
          }
        }

        if (routers.length === 1) {
          raw = grunt.file.read(routers[0]);
          // grab the Module name from Router
          module = raw.substring(0,raw.indexOf('.'));
          // dump that into contents
          origContents = 'define([\n  ""\n],\n\nfunction() {\n\n  // Create a new module.\n  var ' + module + ' = main.module();\n';
          contents = origContents;
          contents += raw + '\n\n';
        } else {
          grunt.fail.warn('Modules require 1 and only 1 Router file');
        }

        if (collections.length > 0) {
          for (i=0; i < collections.length; i++) {
              raw = grunt.file.read(collections[i]);
              contents += module + ".Collection." + raw + '\n\n';
          }
        }
        
        if (models.length > 0) {
          for (i=0; i < models.length; i++) {
              raw = grunt.file.read(models[i]);
              contents += module + ".Model." + raw + '\n\n';
          }
        }
        
        if (views.length > 0) {
          for (i=0; i < views.length; i++) {
              raw = grunt.file.read(views[i]);
              contents += module + ".Views." + raw + '\n\n';
          }
        }

        // make sure someone actually passed something in
        if (contents !== origContents) {
          contents += '  // Return the module for AMD compliance.\n  return '+module+';\n\n});\n\n';
        } else {
          grunt.fail.warn('Module operation failed: no content was found to add to the module');
        }

        if (templates.length > 0) {
          for (i=0; i < templates.length; i++) {
              raw = grunt.file.read(templates[i]);
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
      processTask(this.files[i]);
    }
  });
};