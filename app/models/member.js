'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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
});

module.exports = mongoose.model('Member', memberSchema);
