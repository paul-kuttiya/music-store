var router = new (Backbone.Router.extend({
  routes: {
    "albums/new": App.newAlbum,
    "albums/edit/:id": App.editAlbum,
    "users/signup": User.signup,
    "users/login": User.login,
  },
  index: function() {
    App.indexView();
    this.navigate("/", { trigger: true })
  },
  initialize: function() {
    this.route(/^\/?$/, "index", this.index);
  },
}))();

Backbone.history.start({ pushState: true });

$(document).on('click', "a[href^='/']", function(e) {
  e.preventDefault();

  router.navigate($(e.currentTarget).attr('href'), { trigger: true });
});

$(document).on('click', "a[href^='#']", function(e) {
  e.preventDefault();
});