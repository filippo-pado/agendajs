'use strict';
process.env.NODE_ENV = 'test'; //disable morgan console output
exports.server = require('../server');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let assert = chai.assert;
chai.use(chaiHttp);

exports.chai=chai;
exports.assert=assert;

