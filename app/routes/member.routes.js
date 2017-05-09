'use strict';
var Member = require('../models/member');

//allowed member API
//GET /members
//GET /members/:member_id

//GET /members/:member_id/tasks
//POST /members/:member_id/tasks
//GET /members/:member_id/tasks:task_id
//DELETE /members/:member_id/tasks:task_id
//PUT /members/:member_id/tasks:task_id


//TODO: filter PASSWORD and fields

module.exports = function(apiRoutes) {
    /*apiRoutes.get('/members', function(req, res) {
        Member.find(function(err, members) {
            if (err) res.status(500).send(err);
            else res.json(members);
        });
    });
    apiRoutes.post('/members', function(req, res) {
        Member.create(req.body, function(err, member) {
            if (err) res.status(500).send(err);
            else res.json(member);
        });
    });
    apiRoutes.get('/members/:member_id', function(req, res) {
        Member.findById(req.params.member_id, function(err, member) {
            if (err) res.status(500).send(err);
            else res.json(member);
        });
    });
    apiRoutes.put('/members/:member_id', function(req, res) {
        Member.findByIdAndUpdate(req.params.member_id, req.body, { new: true }, function(err, member) {
            if (err) res.status(500).send(err);
            else res.json(member);
        });
    });
    apiRoutes.delete('/members/:member_id', function(req, res) {
        Member.findByIdAndRemove(req.params.member_id, function(err, member) {
            if (err) res.status(500).send(err);
            else res.json(member);
        });
    });*/
};
