'use strict';
process.env.NODE_ENV = 'test'; //disable morgan console output
let Member = require('../app/models/member');
var bcrypt = require('bcryptjs');
//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let assert = chai.assert;
chai.use(chaiHttp);

//Our parent block
describe('Member', () => {
    beforeEach((done) => { //Before each test we empty the database
        Member.remove({}, () => {
            done();
        });
    });
    describe('/api/members GET/POST request', () => {
        it('it should GET the members', (done) => {
            chai.request(server)
                .get('/api/members')
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.isArray(res.body);
                    assert.equal(res.body.length, 0);
                    done();
                });
        });        
        it('it should POST a member with default fields', (done) => {
            let member = {
                username: 'Test',
				password: 'test'
            };
            chai.request(server)
                .post('/api/members')
                .send(member)
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.username, 'test');
					assert.equal(res.body.username, 'test');
					assert.equal(bcrypt.compareSync('test', res.body.password), true);
                    assert.equal(res.body.admin, false);
                    done();
                });
        });
		it('it should POST a task with default fields', (done) => {
            let member = {
                username: 'Test',
				password: 'test'
            };
            chai.request(server)
                .post('/api/members')
                .send(member)
                .end((err, res) => {
					chai.request(server)
						.post('/api/members/'+res.body._id+'/tasks')
						.send({description: 'test'})
						.end((err, res) => {
							console.log(JSON.stringify(err, null, 2));
							console.log(JSON.stringify(res.body, null, 2));
							assert.equal(res.status, 200);							
							done();
						});
                });
        });
    });
    /*describe('/GET /PUT/ DELETE tasks/task_id', () => {
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
    });*/
});
