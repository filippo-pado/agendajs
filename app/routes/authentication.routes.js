'use strict';
var Member = require('../models/member');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

//allowed authentication API
//POST /authenticate

module.exports = function(apiRoutes, app) {
    apiRoutes.post('/authenticate', function(req, res) {
        console.log(req.body.username);
        Member.findOne({
            username: req.body.username.toLowerCase()
        }, {password: 1}, function(err, member) {
            if (err) res.status(500).send(err);
            if (!member) {
                res.status(401).send('Authentication failed. User not found.');
            } else {
				//if (member.password != req.body.password) {
				if (!bcrypt.compareSync(req.body.password, member.password)){
                    res.status(401).send('Authentication failed. Wrong password.');
                } else {
					member.password=undefined; //cancel password field
                    var token = jwt.sign(member, app.get('secret'), {
                        expiresIn: 1440 // expires in 24 hours
                    });
                    // return the information including token as JSON					
                    res.json({
                        message: 'Authentication successful!',
                        member: member,
                        token: token
                    });
                }
            }
        });
    });
};
