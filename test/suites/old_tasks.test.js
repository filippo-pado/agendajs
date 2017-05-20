'use strict';
/*process.env.NODE_ENV = 'test'; //disable morgan console output
let Task = require('../app/models/task');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let assert = chai.assert;
chai.use(chaiHttp);

//Our parent block
describe('Tasks', () => {
    beforeEach((done) => { //Before each test we empty the database
        Task.remove({}, () => {
            done();
        });
    });
    describe('/GET /POST tasks', () => {
        it('it should GET all the tasks', (done) => {
            chai.request(server)
                .get('/api/tasks')
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.isArray(res.body);
                    assert.equal(res.body.length, 0);
                    done();
                });
        });
        it('it should not POST a task without description field', (done) => {
            let task = {
                owner: "John"
            };
            chai.request(server)
                .post('/api/tasks')
                .send(task)
                .end((err, res) => {
                    assert(res.status === 500);
                    assert.isObject(res.body);
                    assert.isDefined(res.body.errors);
                    assert.isDefined(res.body.errors.description);
                    assert.equal(res.body.errors.description.kind, 'required');
                    done();
                });
        });
        it('it should POST a task with default fields', (done) => {
            let task = {
                owner: "John",
                description: "Buy cookies"
            };
            chai.request(server)
                .post('/api/tasks')
                .send(task)
                .end((err, res) => {
                    let today = (new Date()).toISOString().substring(0, 10);
                    assert.equal(res.status, 200);
                    assert.isObject(res.body);
                    assert.equal(res.body.owner, 'John');
                    assert.equal(res.body.description, 'Buy cookies');
                    assert.equal(res.body.frequency, 'once');
                    assert.include(res.body.taskDate, today);
                    assert.equal(res.body.priority, '2');
                    assert.isNull(res.body.doneDate);
                    done();
                });
        });
        it('it should POST a task with specified fields', (done) => {
            let today = (new Date()).toISOString().substring(0, 10);
            let task = {
                owner: "John",
                description: "Buy a lot of cookies",
                frequency: 'weekly',
                taskDate: today,
                doneDate: '2017-03-20',
                priority: 1
            };
            chai.request(server)
                .post('/api/tasks')
                .send(task)
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.owner, task.owner);
                    assert.equal(res.body.description, task.description);
                    assert.equal(res.body.frequency, task.frequency);
                    assert.include(res.body.taskDate, task.taskDate);
                    assert.equal(res.body.priority, task.priority);
                    assert.include(res.body.doneDate, task.doneDate);
                    done();
                });
        });
    });
    describe('/GET /PUT/ DELETE tasks/task_id', () => {
        it('it should GET a task by id', (done) => {
            Task.create({
                owner: "John",
                description: "Buy cookies"
            }, function(err, task) {
                chai.request(server)
                    .get('/api/tasks/' + task.id)
                    .end((err, res) => {
                        let today = (new Date()).toISOString().substring(0, 10);
                        assert.equal(res.status, 200);
                        assert.equal(res.body.owner, 'John');
                        assert.include(res.body.taskDate, today);
                        done();
                    });
            });
        });
        it('it should PUT a task updating the given task', (done) => {
            Task.create({
                owner: 'John',
                description: 'Buy cookies',
                taskDate: '2017-03-30'
            }, function(err, task) {
                chai.request(server)
                    .put('/api/tasks/' + task.id)
                    .send({
                        description: 'Do not buy cookies',
                        taskDate: '2017-03-29'
                    })
                    .end((err, res) => {
                        assert.equal(res.status, 200);
                        assert.equal(res.body.owner, 'John');
                        assert.equal(res.body.description, 'Do not buy cookies');
                        assert.include(res.body.taskDate, '2017-03-29');
                        assert.equal(res.body.priority, 2);
                        done();
                    });
            });
        });
        it('it should DELETE a task with specified id', (done) => {
            Task.create({
                owner: 'John',
                description: 'Buy cookies',
                taskDate: '2017/03/30'
            }, function(err, task) {
                chai.request(server)
                    .delete('/api/tasks/' + task.id)
                    .end((err, res) => {
                        assert.equal(res.status, 200);
                        chai.request(server)
                            .get('/api/tasks')
                            .end((err, res) => {
                                assert.equal(res.body.length, 0);
                                done();
                            });

                    });
            });
        });
    });
});*/
