'use strict';
var mongoose = require('mongoose');
var taskSchema = require('./task');
var Schema = mongoose.Schema;

var memberSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        default: false
    },
	tasks: [taskSchema]
}, {
    collection: 'members'
});

module.exports = mongoose.model('Member', memberSchema);
