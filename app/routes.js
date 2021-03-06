module.exports = function(app) {
	var express  = require('express'), apiRoutes = express.Router();
	
	app.use('/api', apiRoutes);

	app.get('*', function(req, res) {
		res.sendFile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
};