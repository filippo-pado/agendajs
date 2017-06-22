'use strict';
var Task = require('../models/task');
var handleError = require('./handleError');

//allowed tasks API
//member_id is stored in req.member._id by protect routes

//GET   /tasks
//POST  /tasks

//GET   /tasks/:task_id
//PUT   /tasks/:task_id
//DELETE /tasks/:task_id

module.exports = function(apiRoutes) {
    apiRoutes.get('/tasks', function(req, res) {
        Task.find({ owner: req.member._id }, function(err, tasks) {
            if (err) return handleError(res, 500, err);
            res.json(tasks);
        });
    });
    apiRoutes.post('/tasks', function(req, res) {
        let newTask = req.body;
        newTask.owner = req.member._id;
        Task.create(newTask, function(err, task) {
            if (err) return handleError(res, 500, err);
            res.json(task);
        });
    });
    apiRoutes.get('/tasks/:task_id', function(req, res) {
        Task.findOne({ owner: req.member._id, _id: req.params.task_id }, function(err, task) {
            if (err) return handleError(res, 500, err);
            res.json(task);
        });
    });
    apiRoutes.put('/tasks/:task_id', function(req, res) {
        Task.findOneAndUpdate({ owner: req.member._id, _id: req.params.task_id }, req.body, { new: true }, function(err, task) {
            if (err) return handleError(res, 500, err);
            res.json(task);
        });
    });
    apiRoutes.delete('/tasks/:task_id', function(req, res) {
        Task.findOneAndRemove({ owner: req.member._id, _id: req.params.task_id }, function(err, task) {
            if (err) return handleError(res, 500, err);
            res.json(task);
        });
    });
};
