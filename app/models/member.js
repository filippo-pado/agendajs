'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var memberSchema = new Schema({
    name: {
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
    }
}, {
    collection: 'members'
});

module.exports = mongoose.model('Member', memberSchema);
