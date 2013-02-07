/*
 * grunt-module
 * https://github.com/reputation.com/grunt-module
 *
 * Copyright (c) 2012 Reputation.com
 * Authored by: Jeff Harnois jeff.harnois@reputation.com
 * Licensed under the MIT license.
 *
 */

module.exports = function(grunt) {

  // Please see the grunt documentation for more information regarding task and
  // helper creation: https://github.com/cowboy/grunt/blob/master/docs/toc.md
  
  // ==========================================================================
  // GLOBAL VARS
  // ==========================================================================
  var file = grunt.file,
      log = grunt.log,
      config = grunt.config,
      util = require('util');

  // ==========================================================================
  // TASKS
  // ==========================================================================

  grunt.registerMultiTask('modules', 'Add a module to a file.', function() {
    // make sure we get some data
    if (!this.data) { return false; }
    
    // make sure the destination we get is a file, not a path
    if (this.file.dest[this.file.dest.length - 1] === '/') {
      grunt.fatal('never use path as filename');
      return false;
    }
    
    // send the files and name objects to the helper
    var files = this.file.src[0].files,
        name = this.file.src[0].name,
        dest = this.file.dest;

    grunt.file.write(this.file.dest, grunt.helper('modules', files, name));

    // Fail task if errors were logged.
    if (this.errorCount) { return false; }
    console.log('no errors');

    // Otherwise, print a success message.
    log.writeln('File "' + this.file.dest + '" created.');
    return true;
  });

  // ==========================================================================
  // HELPERS
  // ==========================================================================
  
  grunt.registerHelper('modules', function(files, module) {
    var views = [], 
        templates = [],
        models = [], 
        collections = [],
        routers = [],
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
          var raw = file.read(routers[0][i]);
          contents += raw + '\n\n';
      }
    }

    if (collections[0].length > 0) {
      for (i=0; i < collections[0].length; i++) {
          var raw = file.read(collections[0][i]);
          contents += module + ".Collection." + raw + '\n\n';
      }
    }
    
    if (models[0].length > 0) {
      for (i=0; i < models[0].length; i++) {
          var raw = file.read(models[0][i]);
          contents += module + ".Model." + raw + '\n\n';
      }
    }
    
    if (views[0].length > 0) {
      for (i=0; i < views[0].length; i++) {
          var raw = file.read(views[0][i]);
          contents += module + ".Views." + raw + '\n\n';
      }
    }

    if (contents !== origContents) {
      contents += '  // Return the module for AMD compliance.\n  return '+module+';\n\n});\n\n';
    }

    if (templates[0].length > 0) {
      for (i=0; i < templates[0].length; i++) {
          var raw = file.read(templates[0][i]);
          contents += raw;
      }
    }

    return contents;
  });

};
