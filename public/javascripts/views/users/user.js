var UserView = Backbone.View.extend({
  template: App.templates["user/user"],
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    User.$el.html(this.$el);
  },
  initialize: function() {
    this.render();
  }
});