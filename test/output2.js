define([
  ""
],

function() {

  // Create a new module.
  var Test = main.module("Test");
Test.Collections.Desktop = Backbone.Collection.extend({ /* -- Backbone Collection -- */});

Test.Models.Desktop = Backbone.Model.extend({ /* -- Backbone Model -- */});

Test.Views.Desktop = Backbone.View.extend({ /* -- Backbone View -- */});

  // Return the module for AMD compliance.
  return Test;

});

this['templates'] = this['templates'] || {};

this['templates']['test'] = '<div></div>';