'use strict';
var Member = require('../models/member');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

var members=[]; //username-password

module.exports = function(apiRoutes, app) {
    apiRoutes.get('/populate', function(req, res) {
        console.log("Defining test users");
		var createdMembers=[];
		members.forEach(function(arrmember) {
			Member.deleteOne({username: arrmember.username}, function(err, member) {
				if (err) console.log("Error: "+err);
				Member.create({
						username: arrmember.username,
						password: bcrypt.hashSync(arrmember.password, 10),
						admin: false
					}, function(err, member) {
						if (err) console.log("Error: "+err);
						else console.log("Member created:"+JSON.stringify(member));
						
					}
				);
			});
		});
		res.json({ok: 'ok'});
    });
};