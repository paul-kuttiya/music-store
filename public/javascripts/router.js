var router = new (Backbone.Router.extend({
  routes: {
    "albums/new": App.newAlbum,
    "albums/edit/:id": App.editAlbum,
    "users/signup": User.signup,
    "users/login": User.login,
  },
  index: function() {
    App.indexView();
  },
  path: function(path) {
    this.navigate(path, {trigger: true});
  },
  initialize: function() {
    this.route(/^\/?$/, "index", this.index);
    App.renderUserNavView();
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

$(document).on('submit', function(e) {
  e.preventDefault();
});