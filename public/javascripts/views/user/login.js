var LoginView = Backbone.View.extend({
  template: App.templates["user/login"],
  attributes: {
    id: "login"
  },
  render: function() {
    this.$el.html(this.template());
    App.$el.html(this.$el);
  },
  initialize: function() {
    this.render();
  }
});