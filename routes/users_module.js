var path = require('path'),
    fs   = require('fs'),
    project_path = path.dirname(__dirname),
    file_path = path.resolve(project_path, "data/users.json"),
    users = fs.readFileSync(file_path),
		_ = require('underscore');

 var Users = {
   getUsers: function() {
     return JSON.parse(users);
   },
	 addUser: function(user) {
	   var data = this.getUsers();
		 
		 data.push(user);
		 fs.writeFileSync(file_path, JSON.stringify(data));
	 },
   writeData: function(data) {
     fs.writeFileSync(file_path,  JSON.stringify(data));
   },
   findUser: function(user) { 
     var users = this.getUsers(),
         result = _(users).findWhere({ username: user.username });

     return result;
   },
 };

 module.exports = Users;  