'use strict';
let Task = require('../../app/models/task');
let Member = require('../../app/models/member');
var bcrypt = require('bcryptjs');

var common = require('../common');
let assert = common.assert;
let chai = common.chai;
let server = common.server;

//Our parent block
describe('Task api', () => {
    before((done) => {
        Member.remove({}, () => {
            Task.remove({}, () => {
                done();
            });
        });
    });
    describe('route /api/tasks', () => {
        let testMemberId = null;
        let token = null;
        before((done) => {
            Member.create({ username: 'test1', password: bcrypt.hashSync('test', 10) }, (err, member) => {
                if (err) console.log(err);
                testMemberId = member._id;
                Task.create({ owner: testMemberId, description: 'test' }, (err, task) => {
                    if (err) console.log(err);
                    chai.request(server)
                        .post('/api/authenticate')
                        .send({ username: 'test1', password: 'test' })
                        .end((err, res) => {
                            token = res.body.token;
                            done();
                        });
                });
            });
        });
        it('test GET request', (done) => {
            chai.request(server)
                .get('/api/tasks')
                .set('x-access-token', token)
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.isArray(res.body);
                    assert.equal(res.body.length, 1);
                    assert.equal(res.body[0].description, 'test');
                    assert.equal(res.body[0].owner, testMemberId);
                    //todo: chech other fields
                    done();
                });
        });
        it('test POST request', (done) => {
            let task = {
                description: 'test'
            };
            chai.request(server)
                .post('/api/tasks')
                .set('x-access-token', token)
                .send(task) //todo: test other fields
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.owner, testMemberId);
                    assert.equal(res.body.description, 'test');
                    //todo: check other fields
                    done();
                });
        });
    });
    describe('route /api/members/:member_id/tasks/:task_id', () => {
        let testMemberId = null;
        let testTaskId = null;
        let token = null;
        before((done) => {
            Member.create({ username: 'test2', password: bcrypt.hashSync('test', 10) }, (err, member) => {
                if (err) console.log(err);
                testMemberId = member._id;
                Task.create({ owner: testMemberId, description: 'test' }, (err, task) => {
                    if (err) console.log(err);
                    testTaskId = task._id;
                    chai.request(server)
                        .post('/api/authenticate')
                        .send({ username: 'test2', password: 'test' })
                        .end((err, res) => {
                            token = res.body.token;
                            done();
                        });
                });
            });
        });
        it('test GET request', (done) => {
            chai.request(server)
                .get('/api/tasks/' + testTaskId)
                .set('x-access-token', token)
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.description, 'test');
                    assert.equal(res.body.owner, testMemberId);
                    assert.equal(res.body._id, testTaskId);
                    //todo: chech other fields
                    done();
                });
        });
        it('test PUT request', (done) => {
            let task = {
                description: 'edited'
            };
            chai.request(server)
                .put('/api/tasks/' + testTaskId)
                .set('x-access-token', token)
                .send(task) //todo: test other fields
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.description, 'edited');
                    assert.equal(res.body.owner, testMemberId);
                    assert.equal(res.body._id, testTaskId);
                    //todo: check other fields
                    done();
                });
        });
        it('test DELETE request', (done) => {
            chai.request(server)
                .delete('/api/tasks/' + testTaskId)
                .set('x-access-token', token)
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.owner, testMemberId);
                    assert.equal(res.body._id, testTaskId);
                    Task.findOne({ owner: testMemberId, _id: testTaskId }, function(err, task) {
                        if (err) return handleError(res, 500, err);
                        assert.equal(task, null);
                        done();
                    });
                });
        });
    });
});
