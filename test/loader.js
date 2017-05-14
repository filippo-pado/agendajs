'use strict';
/*let Member = require('../app/models/member');
let Task = require('../app/models/task');
var common = require('./common');*/

describe('Unit test', function () {    
	before((done) => { 
		//console.log('before all tests');
		done();
    });
	require('./member.test');
	require('./task.test');
    after(function () {
        //console.log('after all tests');
    });
});