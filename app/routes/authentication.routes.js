'use strict';
var Member = require('../models/member');
var jwt = require('jsonwebtoken');

//allowed authentication API
//POST /authenticate

//TODO: crypt PASSWORD

 /*Member.create({
	 name: 'testUser',
	 password: 'toBeHashed',
	 admin: true
 }, function(err, member) {
	 console.log(JSON.stringify(member));
});*/

module.exports = function(apiRoutes, app) {
	apiRoutes.post('/authenticate', function(req, res) {
		Member.findOne({
			name: req.body.name
		}, function(err, member) {
			if (err) res.status(500).send(err);
			if (!member) {
				res.json({ success: false, message: 'Authentication failed. User not found.' });
			} 
			else {
				if (user.password != req.body.password) {          
					res.json({ success: false, message: 'Authentication failed. Wrong password.' });
				} else {
					var token = jwt.sign(member, app.get('secret'), {
					  expiresIn: 1440 // expires in 24 hours
					});
					// return the information including token as JSON
					res.json({
						success: true,
						message: 'Authentication successful!',
						token: token
					});
				}
			}
		});
	});
};
