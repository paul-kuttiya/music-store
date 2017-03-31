var SignupView = Backbone.View.extend({
  template: App.templates["user/signup"],
  attributes: {
    id: "signup"
  },
  events: {
    "submit": "signup",
  },
  signup: function(e) {
    var $f = this.$('form'),
        userInfo = $f.serialize();  
  
    $.ajax({
      url: $f.attr('action'),
      type: $f.attr('method'),
      data: userInfo,
      success: function(json) {
        //got {username: username} from server when success
        //declare at index view bottom script
        App.user = new UserModel(json);
        App.setStorage();
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