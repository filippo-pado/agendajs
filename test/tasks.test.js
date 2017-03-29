'use strict';
process.env.NODE_ENV = 'test'; //adjust config file

let mongoose = require("mongoose");
let Task = require('../app/models/task');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Tasks', () => {
    beforeEach((done) => { //Before each test we empty the database
        Task.remove({}, (err) => { 
           done();         
        });     
    });
/*
  * Test the /GET route
  */
  describe('/GET tasks', () => {
      it('it should GET all the tasks', (done) => {
        chai.request(server)
            .get('/tasks')
            .end((err, res) => {
                res.should.have.status(500);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
              done();
            });
      });
  });

});