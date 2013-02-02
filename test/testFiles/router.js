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