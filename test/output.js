/* -- fake libs file -- */
(function($) {

})(jQuery);

define([
  ""
],

function() {

  // Create a new module.
  var Test = main.module("Test");
Test.Router = Backbone.Router.extend({
  routes: {
    "test": "defaultFunction"
  },
  defaultFunction: function() {
    var self = this;
    self.currentRequest = new Test.Views.Desktop();
    self.currentRequest.render();
  }
});

Test.Collections.Desktop = Backbone.Collection.extend({ /* -- Backbone Collection -- */});

Test.Models.Desktop = Backbone.Model.extend({ /* -- Backbone Model -- */});

Test.Views.Desktop = Backbone.View.extend({ /* -- Backbone View -- */});

  // Return the module for AMD compliance.
  return Test;

});

this['templates'] = this['templates'] || {};

this['templates']['test'] = '<div></div>';