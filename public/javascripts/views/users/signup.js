var SignupView = Backbone.View.extend({
  template: App.templates["user/signup"],
  attributes: {
    id: "signup"
  },
  events: {
    "click a#signup": "signup",
  },
  signup: function() {
    var $f = this.$('form'),
        userInfo = $f.serialize();  
  
    $.ajax({
      url: $f.attr('action'),
      type: $f.attr('method'),
      data: userInfo,
      success: function(json) {
        // App.indexView();
        console.log(json);
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