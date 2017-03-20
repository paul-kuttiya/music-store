var UserView = Backbone.View.extend({
  template: App.templates["user/user"],
  events: {
    "click a#logout": "logout",
  },
  logout: function(e) {
    var $f = $(e.target),
        data = {
          "user": JSON.stringify(App.user.toJSON()),
          "cart": JSON.stringify(App.cart.toJSON()),
        };
    
    $.ajax({
      url: $f.data('target'),
      type: $f.data('type'),
      data: data,
    }).done(function(response) {
      App.user.trigger("logout")
      App.user.clear();
      localStorage.clear();
      router.path("/");
      App.indexView();
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