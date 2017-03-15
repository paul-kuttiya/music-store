var SignupView = Backbone.View.extend({
  template: App.templates["user/signup"],
  attributes: {
    id: "signup"
  },
  render: function() {
    this.$el.html(this.template());
    App.$el.html(this.$el);
  },
  initialize: function() {
    this.render();
  }
});