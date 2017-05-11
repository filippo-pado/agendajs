'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var taskSchema = require('./task');

var memberSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    admin: {
        type: Boolean,
        default: false
    },
    tasks: [taskSchema]
});

module.exports = mongoose.model('Member', memberSchema);
