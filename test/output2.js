/* -- fake libs file -- */
(function($) {

})(jQuery);

define([
  ""
],

function() {

  // Create a new module.
  var Test = main.module("Test");
var Models = Models || {};
Models.Desktop = Backbone.Model.extend({ /* -- Backbone Model -- */});

var Collections = Collections || {};
Collections.Desktop = Backbone.Collection.extend({ /* -- Backbone Collection -- */});

Test.Views.Desktop = Backbone.View.extend({ /* -- Backbone View -- */});

  // Return the module for AMD compliance.
  return Test;

});

this['templates'] = this['templates'] || {};

this['templates']['test'] = '<div></div>';