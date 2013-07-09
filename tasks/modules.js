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
      var files = src.files,
          views, 
          templates,
          models, 
          collections,
          libs, 
          router,
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
        } else if (i === "router") {
          if (files[i] !== '') {
            router = files[i];
          }
        } else if (i === "models") {
          if (files[i] !== '') {
            models = files[i];
          }
        } else if (i === "libs") {
          if (files[i] !== '') {
            libs = files[i];
          }
        }
      }

      if (libs && typeof(libs) === 'string') {
        try {
          raw = grunt.file.read(libs);
          origContents += raw + '\n\n';
        } catch (e) {
          grunt.log.error();
          grunt.verbose.error(e);
          grunt.fail.warn('Libs '+libs+ "does not exist",e);
        }
      } else if (libs && libs.length > 0) {
        for (i=0; i < libs.length; i++) {
          try {
            raw = grunt.file.read(libs[i]);
            origContents += raw + '\n\n';
          } catch (e) {
            grunt.log.error();
            grunt.verbose.error(e);
            grunt.fail.warn('Libs '+libs[i]+ "does not exist",e);
          }   
        }
      }

      if ((router && typeof(router) === 'string')) {
        try {
          raw = grunt.file.read(router);
           // grab the Module name from Router
          module = raw.substring(0,raw.indexOf('.'));
          // dump that into contents
          origContents += 'define([\n  ""\n],\n\nfunction() {\n\n  // Create a new module.\n  var ' + module + ' = main.module("' + module + '");\n';
          contents = origContents;
          contents += raw + '\n\n';
        } catch (e) {
          grunt.log.error();
          grunt.verbose.error(e);
          grunt.fail.warn('Router '+router+' does not exist.',e);
        }
      } else if (!router && src.name){
        module = src.name;
        // dump that into contents
        origContents += 'define([\n  ""\n],\n\nfunction() {\n\n  // Create a new module.\n  var ' + module + ' = main.module("' + module + '");\n';
        contents = origContents;        
      } else {
        grunt.fail.warn('Modules requires either a router file string or a name.');
      }

      if (models && models.length > 0) {
        contents += "var Models = Models || {};\n";
        for (i=0; i < models.length; i++) {
          try {
            raw = grunt.file.read(models[i]);
            contents += "Models." + raw + '\n\n';
          } catch (e) {
            grunt.log.error();
            grunt.verbose.error(e);
            grunt.fail.warn('Model '+models[i]+' does not exist.',e);
          }
        }
      }

      if (collections && collections.length > 0) {
        contents += "var Collections = Collections || {};\n";
        for (i=0; i < collections.length; i++) {
          try {
            raw = grunt.file.read(collections[i]);
            contents += "Collections." + raw + '\n\n';
          } catch (e) {
            grunt.log.error();
            grunt.verbose.error(e);
            grunt.fail.warn('Collection '+collections[i]+' does not exist.',e);
          }   
        }
      }
      
      if (views && views.length > 0) {
        for (i=0; i < views.length; i++) {
          try {
            raw = grunt.file.read(views[i]);
            contents += raw + '\n\n';
          } catch (e) {
            grunt.log.error();
            grunt.verbose.error(e);
            grunt.fail.warn('View '+views[i]+' does not exist.',e);
          }   
        }
      }

      // make sure someone actually passed something in
      if (contents !== origContents) {
        contents += '  // Return the module for AMD compliance.\n  return '+module+';\n\n});\n\n';
      } else {
        grunt.fail.warn('Module operation failed: no content was found to add to the module');
      }

      if (templates && templates.length > 0) {
        for (i=0; i < templates.length; i++) {
          try {
            raw = grunt.file.read(templates[i]);
            contents += raw;
          } catch (e) {
            grunt.log.error();
            grunt.verbose.error(e);
            grunt.fail.warn('Template '+templates[i]+' does not exist.',e);
          }
        }
      }
      
      // replace any templating <%= module %>
      contents = grunt.template.process(contents, {data: {module: module}});
      
      try {
        grunt.file.write(dest, contents);
      } catch (e) {
        grunt.log.error();
        grunt.verbose.error(e);
        grunt.fail.warn('Cannot write to '+dest,contents);
      }
    };

    processModule(this.data, this.target);
  });
};
