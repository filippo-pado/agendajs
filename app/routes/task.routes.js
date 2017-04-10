'use strict';
var Task = require('../models/task');

//allowed tasks API
//GET /tasks
//POST /tasks
//GET /tasks:task_id
//DELETE /tasks:task_id
//PUT /tasks:task_id

module.exports = function(apiRoutes) {
    apiRoutes.get('/tasks', function(req, res) {
        Task.find(function(err, tasks) {
            if (err) res.status(500).send(err);
            else res.json(tasks);
        });
    });
    apiRoutes.post('/tasks', function(req, res) {
        Task.create(req.body, function(err, task) {
            if (err) res.status(500).send(err);
            else res.json(task);
        });
    });
    apiRoutes.get('/tasks/:task_id', function(req, res) {
        Task.findById(req.params.task_id, function(err, task) {
            if (err) res.status(500).send(err);
            else res.json(task);
        });
    });
    apiRoutes.put('/tasks/:task_id', function(req, res) {
        Task.findByIdAndUpdate(req.params.task_id, req.body, { new: true }, function(err, task) {
            if (err) res.status(500).send(err);
            else res.json(task);
        });
    });
    apiRoutes.delete('/tasks/:task_id', function(req, res) {
        Task.findByIdAndRemove(req.params.task_id, function(err, task) {
            if (err) res.status(500).send(err);
            else res.json(task);
        });
    });

};
