var path = require('path'),
    fs = require('fs'),
    project_path = path.dirname(__dirname),
    file_path = path.resolve(project_path, "data/albums.json"),
    albums = fs.readFileSync(file_path);

var Albums = {
  id: function() {
    return JSON.parse(albums).last_id;
  },
  get: function() {
    return JSON.parse(albums).data;
  },
  getLastId: function() {
    return this.id() + 1;
  },
  set: function(data, last_id ) {
    if (last_id === undefined) {
      last_id = this.id();
    }

    var json = {"last_id": last_id, "data": data}

    var json = {"last_id": last_id, "data": data};
    fs.writeFileSync(file_path, JSON.stringify(json));
  },
};

  // set: function(last_id, data) {
  //   var json = {"last_id": last_id, "data": data};
  //   fs.writeFileSync(file_path, JSON.stringify(json));
  // },

module.exports = Albums;

