'use strict';
var Member = require('../models/member');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

//allowed authentication API
//POST /authenticate

module.exports = function(apiRoutes, app) {
    apiRoutes.post('/authenticate', function(req, res) {
        Member.findOne({
            username: req.body.username.toLowerCase()
        }, 'username password admin', function(err, member) {
            if (err) res.status(500).send(err);
            if (!member) {
                res.status(401).send('Authentication failed. User not found.');
            } else {
                if (!bcrypt.compareSync(req.body.password, member.password)) {
                    res.status(401).send('Authentication failed. Wrong password.');
                } else {
                    let memberToSend = {
                        _id: member._id,
                        username: member.username,
                        admin: member.admin
                    };
                    var token = jwt.sign(memberToSend, app.get('secret'), {
                        expiresIn: '24h' // expires in 24 hours
                    });
                    // return the information including token as JSON                   
                    res.json({
                        message: 'Authentication successful!',
                        member: memberToSend,
                        token: token
                    });
                }
            }
        });
    });
};
