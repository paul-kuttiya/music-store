var App = {
  $el: $('main'),
  $add: $('a.create'),
  templates: JST,
  indexView: function() {
    this.IndexView = new IndexView();
    this.renderUserView();
    // if (!!this.user) {
    //   this.renderUserView();
    // }
    //render first load
    this.renderAlbum();
    this.bindEvents();
  },
  renderUserView: function() {
    new UserView({model: this.user});
  },
  renderAlbum: function() {
    //this.albums = albums from Express get from data
    //set this.albums at index.jade
    this.albums.forEach(this.createAlbumView.bind(this));
  },
  createAlbumView: function(album) {
    new albumView({
      model: album,
    });
  },
  bindEvents: function() {
    _.extend(this, Backbone.Events);
    this.listenTo(this.IndexView, "add_album", this.newAlbum);
    this.listenTo(this.albums, "edit_album", this.editAlbum);
    //listens to albums collection events then re-render;
    this.listenTo(this.albums, "change update", this.indexView);
    this.listenTo(this.user, "change", this.renderUserView);
    this.listenTo(this.user, "page_refresh", this.renderUserView);
  },
  //show edit form with model attr
  editAlbum: function(id) {
    var id = App.edit_id || +id;
    //set id to App.edit_id --> from click event || +id from router refresh
    //id available from being a router routes callback(when refresh)
    var edit_album = App.albums.findWhere({ id: id });
    var edit = new EditAlbumView({
      model: edit_album,
    });
  },
  newAlbum: function() {
    new NewAlbumView();
  },
};

var User = {
  $el: $('nav#top ul.header-links'),
  signup: function() {
    new SignupView();
  },
  login: function() {
    new LoginView();
  }
};