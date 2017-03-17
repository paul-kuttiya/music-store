var LoginView = Backbone.View.extend({
  template: App.templates["user/login"],
  events: {
    "click input#login": "login",
  },
  login: function(e) {
    var $f = $(e.target).closest('form');

    $.ajax({
      url: $f.attr('action'),
      type: $f.attr('method'),
      data: $f.serialize(),
      success: function(json) {
        App.user = new UserModel(json);
        router.path("/");
      },
    });
  },
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