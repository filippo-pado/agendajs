'use strict';
var Task = require('../models/task');
var handleError = require('./handleError');

//allowed tasks API

//GET   /members/:member_id/tasks
//POST  /members/:member_id/tasks

//GET   /members/:member_id/tasks/:task_id
//PUT   /members/:member_id/tasks/:task_id
//DELETE /members/:member_id/tasks/:task_id

module.exports = function(apiRoutes) {
    apiRoutes.get('/members/:member_id/tasks', function(req, res) {
        Task.find({owner: req.params.member_id}, function(err, tasks) {
            if (err) return handleError(res, 500, err);
            res.json(tasks);
        });
    });
    apiRoutes.post('/members/:member_id/tasks', function(req, res) {
		var newTask=req.body;
		newTask.owner=req.params.member_id;
        Task.create(newTask, function(err, task) {
			if (err) res.status(500).send(err);
			res.json(task);
		});
    });
    apiRoutes.get('/members/:member_id/tasks/:task_id', function(req, res) {
        Task.findOne({owner: req.params.member_id, _id: req.params.task_id}, function(err, task) {
            if (err) return handleError(res, 500, err);
            res.json(task);            
        });
    });
    apiRoutes.put('/members/:member_id/tasks/:task_id', function(req, res) {
        Task.findOneAndUpdate({owner: req.params.member_id, _id: req.params.task_id}, req.body, { new: true }, function(err, task) {
            if (err) return handleError(res, 500, err);
            res.json(task);
        });
    });
    apiRoutes.delete('/members/:member_id/tasks/:task_id', function(req, res) {
        Task.findOneAndRemove({owner: req.params.member_id, _id: req.params.task_id}, function(err, task) {
            if (err) return handleError(res, 500, err);
            res.json(task);
        });
    });
};
