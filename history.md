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
		-User module
		-Verification user sign in
		-Modify Backbone route to render index view if verification succeed.

03/16/2017
*Add npm express session -S
*Add signup require only username and password
*Revise sign up anchor tag to "#"
*Revise Backbone route for signup tag
*Add Backbone route navigate to index
*Render nav bar to contain username when sign up
	-Fix Express router render all route with index page

03/17/2016
*Add login validation
*Add admin privilege for express route and Backbone view
*Add 404 jade view

03/19
*Create cart css