var IndexView = Backbone.View.extend({
  template: App.templates.index,
  events: {
    "click a#new": "addAlbum",
  },
  addAlbum: function(e) {
    this.trigger("add_album");
    console.log("trigger add_album");
  },
  render: function() {
    //set $el html to template
    this.$el.html(this.template(App.user.toJSON()));
    //insert to 'main' element
    //empty main element before re-render --> fix duplication
    this.$el.appendTo(App.$el.empty());
  },
  initialize: function() {
    this.render();
  },
});