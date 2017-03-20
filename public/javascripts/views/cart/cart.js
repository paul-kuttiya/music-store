var CartView = Backbone.View.extend({
  template: App.templates["cart/cart"],
  events: {
    "click span#remove": "destroy"
  },
  destroy: function(e) {
    var $item = $(e.target),
        id = +$item.data('id');
    //trigger destory event in collection
    this.collection.trigger("destroy", id);
    this.render();
  },
  el: $('#cart').get(0),
  render: function() {
    var json = {
      quantity: this.collection.quantity,
      total: this.collection.total,
      items: this.collection.toJSON(),
    }

    this.$el.html(this.template(
      json
    ));
  },
  initialize: function() {
    this.render();
    //listen to collection cart_update event
    this.listenTo(this.collection, "cart_update", this.render);
  }
});