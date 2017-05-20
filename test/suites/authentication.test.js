'use strict';
let Member = require('../../app/models/member');
var bcrypt = require('bcryptjs');

var common = require('../common');
let assert = common.assert;
let chai = common.chai;
let server = common.server;

//Our parent block
describe('Authentication api', () => {
    before((done) => {
        Member.remove({}, () => {
            done();
        });
    });
    describe('route /api/authenticate', () => {
        let username = 'test';
        let password = 'testPassword';
        before((done) => {
            Member.create({ username: 'test', password: bcrypt.hashSync(password, 10) }, (err, member) => {
                if (err) console.log(err);
                done();
            });
        });
        it('test POST request', (done) => {
            chai.request(server)
                .post('/api/authenticate')
                .send({ username: username, password: password })
                .end((err, res) => {
                    if (err) console.log(err);
                    assert.equal(res.status, 200);
                    assert.equal(res.body.member.username, 'test');
                    assert.equal(res.body.member.password, undefined);
                    assert.isString(res.body.token);
                    done();
                });
        });
    });
});
