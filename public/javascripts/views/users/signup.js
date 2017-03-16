var SignupView = Backbone.View.extend({
  template: App.templates["user/signup"],
  attributes: {
    id: "signup"
  },
  events: {
    "click a#signup": "signup",
  },
  signup: function(e) {
    var $f = this.$('form'),
        userInfo = $f.serialize();  
  
    $.ajax({
      url: $f.attr('action'),
      type: $f.attr('method'),
      data: userInfo,
      success: function(json) {
        var model = new UserModel(json);

        new UserView({model: model});

        router.path("/");
      },
      error: function() {
        //flash
      },
    });
  },
  render: function() {
    this.$el.html(this.template());
    App.$el.html(this.$el);
  },
  initialize: function() {
    this.render();
  }
});