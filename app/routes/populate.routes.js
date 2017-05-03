'use strict';
var Member = require('../models/member');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

module.exports = function(apiRoutes, app) {
    apiRoutes.get('/populate', function(req, res) {
        console.log("Defining test user");
        Member.deleteOne({username: 'test'}, function(err, member) {
            if (err) console.log("Error: "+err);
			Member.create({
					username: 'test',
					password: bcrypt.hashSync('testPassword', 10),
					admin: false
				}, function(err, member) {
					if (err) console.log("Error: "+err);
					else console.log("Member created:"+JSON.stringify(member));
					res.json({"done": "done"});
				}
			);
		});
    });
};