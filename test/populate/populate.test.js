'use strict';
let Task = require('../../app/models/task');
let Member = require('../../app/models/member');
let bcrypt = require('bcryptjs');

let common = require('../common');
let assert = common.assert;
let chai = common.chai;
let server = common.server;

//Our parent block
describe('Popoulate DB', () => {
    before((done) => {
        Member.remove({}, () => {
            Task.remove({}, () => {
                done();
            });
        });
    });
    it('populate first member', (done) => {
        Member.create({ username: 'test', password: bcrypt.hashSync('test', 10) }, (err, member) => {
            if (err) console.log(err);
            chai.request(server)
                .post('/api/authenticate')
                .send({ username: 'test', password: 'test' })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    let token = res.body.token;
                    chai.request(server)
                        .post('/api/tasks')
                        .set('x-access-token', token)
                        .send({ description: 'testTask' })
                        .end((err, res) => {
                            assert.equal(res.status, 200);
                            let token = res.body.token;
                            done();
                        });
                });
        });
    });
    it('populate second member', (done) => {
        Member.create({ username: 'test2', password: bcrypt.hashSync('test', 10) }, (err, member) => {
            if (err) console.log(err);
            chai.request(server)
                .post('/api/authenticate')
                .send({ username: 'test2', password: 'test' })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    let token = res.body.token;
                    chai.request(server)
                        .post('/api/tasks')
                        .set('x-access-token', token)
                        .send({ description: 'testTask2' })
                        .end((err, res) => {
                            assert.equal(res.status, 200);
                            let token = res.body.token;
                            done();
                        });
                });
        });
    });
});
