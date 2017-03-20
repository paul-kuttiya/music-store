//will pass each model from collection 
//and literate in main application.js
var albumView = Backbone.View.extend({
  tagName: 'li',
	template: App.templates["album/album"],
	events: {
		"click a#delete": "delete",
		"click a#edit": "edit",
		"click a#add_to_cart": "addToCart",
	},
	addToCart: function() {
		//pass extra arg to the callback when trigger
		//pass this.model to callback in --> App.on("add_to_cart", callback)
		App.trigger("add_to_cart", this.model);
	},
	edit: function() {
		var id = +this.$el.attr("album_id");

		App.edit_id = id;
		console.log("edit_album");		
		App.albums.trigger("edit_album");
		
	},
	delete: function(e) {
		var id = this.model.id,
				$t = $(e.target),
				delete_album = App.albums.findWhere({ id: id });
	
		$.ajax({
			url: $t.data('target'),
			type: 'delete',
			//delete no need to pass data to server
			success: function() {
				var confirm = window.confirm("Delete album?");
				if (confirm) { App.albums.remove(delete_album); }
			},
		});
	},
	render: function() {
		this.$el.attr("album_id", this.model.toJSON().id);
		this.$el.html(this.template(this.model.toJSON()));
		this.$el.appendTo(App.$el.find('ul'));
	},
  initialize: function() {
    this.model.view = this;
		this.render();
  }
});