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
    var files = this.file.src.files,
        module = this.file.src.name,
        dest = this.file.dest;

    grunt.file.write(this.file.dest, grunt.helper('modules', files, module));

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
        contents = 'define([\n  ""\n],\n\nfunction() {\n\n  // Create a new module.\n  var ' + module + ' = main.module();\n';

    for (var i in files) {
      if (i === "views") {
        views.push(files[i]);
      } else if (i === "templates") {
        templates.push(files[i]);
      } else if (i === "collections") {
        collections.push(files[i]);
      } else if (i === "routers") {
        routers.push(files[i]);
      } else if (i === "models") {
        models.push(files[i]);
      }
    }

    routers.map(function(filepath) {
      var raw = file.read(filepath);
      if (raw !== '') {
        contents += raw + '\n\n';
      }
    });

    collections.map(function(filepath) {
      var raw = file.read(filepath);
      if (raw !== '') {
        contents += module + ".Collection." + raw + '\n\n';
      }
    });

    models.map(function(filepath) {
      var raw = file.read(filepath);
      if (raw !== '') {
        contents += module + ".Model." + raw + '\n\n';
      }
    });

    views.map(function(filepath) {
      var raw = file.read(filepath);
      if (raw !== '') {
        contents += module + ".Views." + raw + '\n\n';
      }
    });

    contents += '  // Return the module for AMD compliance.\n  return '+module+';\n\n});\n\n';

    templates.map(function(filepath) {
      var raw = file.read(filepath);
      if (raw !== '') {
        contents += raw;
      }
    });

    return contents;
  });

};