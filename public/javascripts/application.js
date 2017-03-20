var App = {
  $el: $('main'),
  templates: JST,
  indexView: function() {
    this.IndexView = new IndexView();

    //first load
    this.renderUserNavView();
    this.renderAlbum();
    this.bindEvents();
  },
  renderUserNavView: function() {
    var user = this.checkUser();
    new UserView({model: user});
    this.createCart();
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
  createCart: function() {
    this.cart = new CartItems();
    this.cart.view = new CartView({
      collection: this.cart
    });
  },
  bindEvents: function() {
    _.extend(this, Backbone.Events);
    this.listenTo(this.IndexView, "add_album", this.newAlbum);
    this.listenTo(this.albums, "edit_album", this.editAlbum);
    //listens to albums collection events then re-render;
    this.listenTo(this.albums, "change update", this.indexView);
    this.listenTo(this.user, "change logout", this.renderUserNavView);
    //trigger from album view
    this.on("add_to_cart", this.cart.addItem.bind(this.cart));
  },
  //refactor --> move to user model
  setStorage: function() {
    var user = App.user.toJSON();
    localStorage.setItem("user", JSON.stringify(user));
  },
  getStorage: function() {
    if (!localStorage.user) {
      return;
    }
    var user = JSON.parse(localStorage.user);
    return user;
  },
  checkUser: function() {
    var loggedIn = localStorage.getItem("user"),
        user;
    
    if (loggedIn) {
      user = JSON.parse(loggedIn);
      this.user = new UserModel(user)
    }

    return this.user;
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
    if (App.user.toJSON().username) {
      router.path("/");
      return;
    }

    new SignupView();
  },
  login: function() {
    if (App.user.toJSON().username) {
      router.path("/");
      return;
    }
    new LoginView();
  },
  isLoggedIn: function() {
    return App.getStorage();
  },
  isAdmin: function() {
    if (this.isLoggedIn() && this.isLoggedIn().admin) {
      return this.isLoggedIn().admin;
    }
  },
};

Handlebars.registerHelper('admin', function(options) {
  if (User.isAdmin()) {
    return options.fn(this);
  }
});

//refactor
Handlebars.registerHelper('notAdmin', function(options) {
  if (!User.isAdmin()) {
    return options.fn(this);
  }
});