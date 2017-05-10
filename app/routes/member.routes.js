'use strict';
var Member = require('../models/member');
var Task = require('../models/task');
var bcrypt = require('bcryptjs');
var handleError = require('./handleError');

//allowed member API

//GET   /members
//POST  /members
//GET   /members/:member_id

//GET   /members/:member_id/tasks
//POST  /members/:member_id/tasks
//GET   /members/:member_id/tasks/:task_id
//DELETE /members/:member_id/tasks/:task_id
//PUT   /members/:member_id/tasks/:task_id

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

    apiRoutes.get('/members/:member_id/tasks', function(req, res) {
        Member.findById(req.params.member_id).populate('tasks').exec(function(err, member) {
            if (err) return handleError(res, 500, err);
            res.json(member.tasks);
        });
    });
    apiRoutes.post('/members/:member_id/tasks', function(req, res) {
        Member.findById(req.params.member_id, function(err, member) {
            if (err) return handleError(res, 500, err);
            Task.create(req.body, function(err, task) {
                if (err) return handleError(res, 500, err);
                member.tasks.push(task._id);
                member.save();
                res.json(task);
            });
        });
    });
    apiRoutes.get('/members/:member_id/tasks/:task_id', function(req, res) {
        Member.findById(req.params.member_id, function(err, member) {
            if (err) return handleError(res, 500, err);
            Task.findById(req.params.task_id, function(err, task) {
                if (err) return handleError(res, 500, err);
                if (member.tasks.indexOf(task._id) == -1) return handleError(res, 500, "Not a members's task!");
                res.json(task);
            });
        });
    });
};
