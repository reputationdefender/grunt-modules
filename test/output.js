define([
  ""
],

function() {

  // Create a new module.
  var Test = main.module();
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

Test.Collection.Desktop = Backbone.Collection.extend({ /* -- Backbone Collection -- */});

Test.Model.Desktop = Backbone.Model.extend({ /* -- Backbone Model -- */});

Test.Views.Desktop = Backbone.View.extend({ /* -- Backbone View -- */});

  // Return the module for AMD compliance.
  return Test;

});

this['templates'] = this['templates'] || {};

this['templates']['test'] = '<div></div>';