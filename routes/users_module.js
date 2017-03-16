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
	 writeTofile: function(user) {
	   var data = this.getUsers();
		 
		 data.push(user);
		 fs.writeFileSync(file_path, JSON.stringify(data));
	 },
   findUser: function(new_user) {
     var user_data = this.getUsers(), 
		 		 user;
		
     user = _(user_data).findWhere({ username: new_user.username });
     
		 return user;
   },
 };

 module.exports = Users;  