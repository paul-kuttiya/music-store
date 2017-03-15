var AlbumRouter = new (Backbone.Router.extend({
  routes: {
    "albums/new": App.newAlbum,
    "albums/edit/:id": App.editAlbum,
    "user/signup": User.signup,
    "user/login": User.login,
  },
  index: function() {
    App.indexView();
  },
  initialize: function() {
    this.route(/^\/?$/, "index", this.index);
  },
}))();

Backbone.history.start({ pushState: true });

$(document).on('click', "a[href^='/']", function(e) {
  e.preventDefault();
  // AlbumRouter.navigate($(e.currentTarget).attr('href').replace(/^\//, ""), { trigger: true });
  AlbumRouter.navigate($(e.currentTarget).attr('href'), { trigger: true });
});