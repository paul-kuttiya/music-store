var EditAlbumView = Backbone.View.extend({
  template: App.templates["album/edit"],
  events: {
    "click a#cancel": "cancel",
    "click a#update": "update",
  },
  update: function() {
    var $f = this.$('form');
        id = +$f.attr("action").replace(/\D/gi, '');

        var update_album = {}, model;
        $f.serializeArray().forEach(function(pair) {
          update_album[pair.name] = pair.value;
        });

        //set id for updated json
        update_album.id = id;

    $.ajax({
      url: $f.attr('action'),
      type: $f.attr('method'),
      //pass data to server --> will grab by req.body in express
      data: update_album,
      success: function() {
        model = App.albums.findWhere({ id: id });
        //no need to pass id since update for the same id;
        model.set(update_album);
      },
    })
  },
  cancel: function() {
    if (App.edit_id) { App.edit_id = undefined };
  },
  attributes: {
    id: "edit_album",
  },
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    App.$el.html(this.$el);
  },
  initialize: function() {
    this.render()
  },
});