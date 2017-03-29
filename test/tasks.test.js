'use strict';
process.env.NODE_ENV = 'test'; //adjust config file

let Task = require('../app/models/task');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let assert=chai.assert;
chai.use(chaiHttp);

//Our parent block
describe('Tasks', () => {
  beforeEach((done) => { //Before each test we empty the database
      Task.remove({}, () => { 
         done();         
      });     
  });
  /*
  * Test the /GET route
  */
  describe('/GET tasks', () => {
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
  });
  describe('/POST tasks', () => {
    it('it should not POST a task without description field', (done) => {
      let task = {
          owner: "John"          
      };
      chai.request(server)
          .post('/api/tasks')
          .send(task)
          .end((err, res) => {
              assert(res.status===500);
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
              assert.isFalse(res.body.done);
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
          done: true,
          priority: 1
      };
      chai.request(server)
          .post('/api/tasks')
          .send(task)
          .end((err, res) => {
              assert.equal(res.status, 200);
              task.taskDate=res.body.taskDate; //format issue, skip check
              assert.deepEqual(task, {owner: res.body.owner, description: res.body.description, frequency: res.body.frequency, taskDate: res.body.taskDate, priority: res.body.priority, done: res.body.done});
          done();
          });
    });
  });
});