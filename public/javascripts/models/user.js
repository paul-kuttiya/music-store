var UserModel = Backbone.Model.extend({
  getStorage: function() {
    var user = localStorage.getItem('user');

    if (!user) {
      return
    }
    this.info = JSON.parse(localStorage.user);
  },
  initialize: function() {
    this.getStorage();
  }
})