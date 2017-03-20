var CartItems = Backbone.Collection.extend({
  //setTotal for collection
  setTotal: function() {
    //collection.total --> pass in collection view.
    //collection.toJSON() --> get array of collection attributes
    this.total = this.toJSON().reduce(function(a, b) {
      //first iterate --> 0 + [first array element] --> number
      //repeat
      return a + b.price * b.quantity;
    }, 0);
    return this;
  },
  //setQuantity for collection --> call when addItem involked
  setQuantity: function() {
    this.quantity = this.toJSON().reduce(function(a, b) {
      return a + b.quantity;
    }, 0);
    return this;
  },
  addItem: function(model) {
    //call when trigger add_to_cart event in albumView
    //add model to collection
    var existing = this.get(model.get("id")),
        item;
    
    //if model is in collection set quantity + 1
    if (existing) {
      existing.set("quantity", existing.get("quantity") + 1);
    } else {
      //if not yet in cart clone model and set "quantity" attr for item to 1
      item = model.clone();
      item.set("quantity", 1);
      //set model quantity then add to collection      
      this.add(item);
    }

    //after check existing find and update total and quantity
    this.setTotal().setQuantity();
    this.trigger("cart_update");
    console.log("cart_update");
    //will listen by collectionView(carView) then render
  },
  destroy: function(id) {
    var item = this.get(id);

    this.remove(item);
    this.setQuantity().setTotal();
  },
  initialize: function() {
    //listen to destroy triggered from view;
    this.on('destroy', this.destroy);
  }
});