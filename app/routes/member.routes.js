'use strict';
var Member = require('../models/member');
var bcrypt = require('bcryptjs');
var handleError = require('./handleError');

//allowed member API

//GET   /members
//POST  /members

//GET   /members/:member_id

module.exports = function(apiRoutes) {
    apiRoutes.get('/members', function(req, res) {
        Member.find(function(err, members) {
            if (err) return handleError(res, 500, err);
            res.json(members);
        });
    });
    apiRoutes.post('/members', function(req, res) {
        var newMember = req.body;
        newMember.username = newMember.username.toLowerCase();
        newMember.password = bcrypt.hashSync(newMember.password, 10);
        Member.findOne({ username: newMember.username }, function(err, member) {
            if (err) return handleError(res, 500, err);
            if (member) return handleError(res, 409, 'Username already taken!');
            Member.create(newMember, function(err, member) {
                if (err) res.status(500).send(err);
                res.json(member);
            });
        });
    });
    apiRoutes.get('/members/:member_id', function(req, res) {
        Member.findById(req.params.member_id, function(err, member) {
            if (err) return handleError(res, 500, err);
            res.json(member);
        });
    });
};
