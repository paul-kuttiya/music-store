var UserView = Backbone.View.extend({
  template: App.templates["user/user"],
  events: {
    "click a#logout": "logout",
  },
  logout: function(e) {
    var $f = $(e.target);

    $.ajax({
      url: $f.data('target'),
      type: $f.data('type'),
      success: function() {
        App.user.clear();
        App.indexView();
        console.log('out')
      }
    });
  },
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    User.$el.html(this.$el);
  },
  initialize: function() {
    this.render();
  }
});