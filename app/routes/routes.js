'use strict';
module.exports = function(app) {
    var express = require('express'),
        apiRoutes = express.Router(),
        path = require('path');

    //-------------------------------------------------------------
    //UNPROTECTED ROUTES    
    require('./authentication.routes.js')(apiRoutes, app);
    require('./protect.routes.js')(apiRoutes, app);

    //-------------------------------------------------------------
    //PROTECTED ROUTES - have req.member decoded if logged in	
    require('./member.routes.js')(apiRoutes);
	require('./task.routes.js')(apiRoutes);

    app.use('/api', apiRoutes);

    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, '../../dist/index.html')); // load the single view file (angular will handle the page changes on the front-end)
    });
};
