'use strict';
var Task = require('../models/task');

module.exports = function(apiRoutes) {
	apiRoutes.get('/tasks', function(req, res) {		
		Task.find(function(err, tasks) {
			if (err) {
				res.status(500).send(err);
			}
			else {
				res.json(tasks);
			}
		});
	});
	apiRoutes.post('/tasks', function(req, res) {		
		Task.create({
			owner : req.body.owner,
			description : req.body.description,
			frequency : req.body.frequency,
			taskDate : req.body.taskDate,
			priority : req.body.priority			
	    }, function(err, task) {
			if (err){
				res.status(500).send(err);
			}
			else {
				res.json(task);
			}
		});
	});
};