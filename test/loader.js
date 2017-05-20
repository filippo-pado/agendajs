'use strict';
/*let Member = require('../app/models/member');
let Task = require('../app/models/task');
var common = require('./common');*/

describe('Unit test', function() {
    before((done) => {
        //console.log('before all tests');
        done();
    });
    require('./suites/authentication.test');
    require('./suites/member.test');
    require('./suites/task.test');
    after(function() {
        //console.log('after all tests');
    });
});
