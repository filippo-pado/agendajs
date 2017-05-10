'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var taskSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    frequency: {
        type: String,
        enum: ['once', 'daily', 'weekly', 'monthly'],
        default: 'once'
    },
    taskDate: {
        type: Date,
        default: Date.now
    },
    priority: {
        type: Number,
        enum: [1, 2, 3],
        default: 2
    },
    doneDate: {
        type: Date,
        default: null
    }
});

module.exports = mongoose.model('Task', taskSchema);
