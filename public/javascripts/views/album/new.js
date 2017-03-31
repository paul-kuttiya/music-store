var NewAlbumView = Backbone.View.extend({
  template: App.templates["album/new"],
  events: {
    "click a#cancel": "cancel",
    "submit": "create",
  },
  attributes: {
    id: "album_new",
  },  
  create: function(e) {
    //equal to this.$el.find('form');
    var cover = "http://placehold.it/170x170";
    this.$('input#cover').val(cover);

    var $f = this.$('form'),
        new_album = $f.serialize();

    $.ajax({
      url: $f.attr('action'),
      type: $f.attr('method'),
      data: new_album,
      success: function(json) {
        //use add --> fire event "add"
        //use App.bindEvents to detect collection change then re-render
        App.albums.add(json)
        router.path("/");
      },
    });
  },
  cancel: function(e) {
    console.log("events cancel");
    this.$el.hide();
    App.indexView();
  },
  render: function() {
    this.$el.html(this.template());
    App.$el.html(this.$el);
  },
  initialize: function() {
    this.render();
  }
});