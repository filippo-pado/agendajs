'use strict';
var jwt = require('jsonwebtoken');

module.exports = function(apiRoutes, app) {
    apiRoutes.use(function(req, res, next) {
        var token = req.headers['x-access-token'];
        if (token) {
            jwt.verify(token, app.get('secret'), function(err, decoded) {
                if (err) {
                    return res.status(401).send('Failed to authenticate token. Error:' + err.message);
                } else {
                    req.member = decoded;
                    next();
                }
            });
        } else {
            return res.status(403).send('No token provided.');
        }
    });
};
