'use strict';
var Member = require('../models/member');
var jwt = require('jsonwebtoken');

//allowed authentication API
//POST /authenticate

//TODO: crypt PASSWORD
/*Member.remove({}, () => {});
Member.create({
    username: 'test',
    password: 'test',
    admin: false
}, function(err, member) {
    console.log(JSON.stringify(member));
});*/

module.exports = function(apiRoutes, app) {
    apiRoutes.post('/authenticate', function(req, res) {
        console.log(req.body.username);
        Member.findOne({
            username: req.body.username
        }, function(err, member) {
            if (err) res.status(500).send(err);
            if (!member) {
                res.status(401).send('Authentication failed. User not found.');
            } else {
                if (member.password != req.body.password) {
                    res.status(401).send('Authentication failed. Wrong password.');
                } else {
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
