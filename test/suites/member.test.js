'use strict';
let Task = require('../../app/models/task');
let Member = require('../../app/models/member');
let bcrypt = require('bcryptjs');

let common = require('../common');
let assert = common.assert;
let chai = common.chai;
let server = common.server;

//Our parent block
describe('Member api', () => {
    before((done) => {
        Member.remove({}, () => {
            Task.remove({}, () => {
                done();
            });
        });
    });
    describe('route /api/members', () => {
        let token = null;
        before((done) => {
            Member.create({ username: 'test', password: bcrypt.hashSync('test', 10) }, (err, member) => {
                if (err) console.log(err);
                chai.request(server)
                    .post('/api/authenticate')
                    .send({ username: 'test', password: 'test' })
                    .end((err, res) => {
                        token = res.body.token;
                        done();
                    });

            });
        });
        //.set('x-access-token', token)
        it('test GET request', (done) => {
            chai.request(server)
                .get('/api/members')
                .set('x-access-token', token)
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.isArray(res.body);
                    assert.equal(res.body.length, 1);
                    assert.equal(res.body[0].username, 'test');
                    assert.equal(res.body[0].admin, false);
                    done();
                });
        });
        it('test POST request', (done) => {
            let member = {
                username: 'Test2',
                password: 'testing',
                admin: true
            };
            chai.request(server)
                .post('/api/members')
                .set('x-access-token', token)
                .send(member)
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.username, 'test2');
                    assert.equal(bcrypt.compareSync('testing', res.body.password), true);
                    assert.equal(res.body.admin, true);
                    done();
                });
        });
    });
    describe('route /api/members/:member_id', () => {
        let testMemberId = null;
        let token = null;
        before((done) => { //Before each test we empty the database
            Member.create({ username: 'test3', password: bcrypt.hashSync('test', 10) }, (err, member) => {
                if (err) console.log(err);
                testMemberId = member._id;
                chai.request(server)
                    .post('/api/authenticate')
                    .send({ username: 'test3', password: 'test' })
                    .end((err, res) => {
                        token = res.body.token;
                        done();
                    });
            });
        });
        it('test GET request', (done) => {
            chai.request(server)
                .get('/api/members/' + testMemberId)
                .set('x-access-token', token)
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.username, 'test3');
                    assert.equal(res.body.admin, false);
                    assert.equal(res.body.password, undefined);
                    done();
                });
        });
    });
});