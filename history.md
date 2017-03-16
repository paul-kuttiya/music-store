03/16/2017
*Revise user to users
*Sign up and login use email and password.
*Frontend: @ public/javascripts/views/signup.js
	*Add Sign up events for Backbone sign up view
		-Add ajax event for #signup post username and password for success.
Backend: @ routes/users.js
	*Install uuid for npm for generating users' id.
		-uuid.v4()
	*Create users module to deal with users data.
		-Require path and fs for finding data path.
		-Create get and set user
	*Create response to front-end signup view ajax event.
		-Verification using users_module
		-Modify Backbone route to render index view if verification succeed.

03/16/2017
*Add backbone route condition		