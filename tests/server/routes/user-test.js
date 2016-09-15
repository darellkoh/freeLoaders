var expect = require('chai').expect;

var Sequelize = require('sequelize');

var db = require('../../../server/db');

var supertest = require('supertest');

describe('Product Route', function () {

  var app, User;

    beforeEach('Sync DB', function () {
        return db.sync({ force: true });
    });

    beforeEach('Create app', function () {
        app = require('../../../server/app')(db);
        User = db.model('user');
    });

    var userInfo = {
      id: 1,
      email: 'LebronJames@StephCurry.com',
      password: 'MOM'
    }

    beforeEach('Create a Product', function (done) {
      return User.create(userInfo).then(function (user) {
                done();
            }).catch(done);
    });

    describe('User route responds with created user.', function () {

      var orderAgent;

      beforeEach('Create order agent', function () {
        orderAgent = supertest.agent(app);
      });

      it('should get a 200 response from the users route and the first user should have an id of 1', function (done) {
        orderAgent.get('/api/users/')
          .expect(200)
          .end(function (err, response) {
            if (err) return done(err);
            expect(response.body).to.be.an('array');
            expect(response.body[0].id).to.eql(userInfo.id);
            expect(response.body[0].email).to.eql(userInfo.email);
            // Shouldn't check password here because it's encrypted on the response
            // Security Schmamertiy 
            expect(response.body.length).to.eql(1);
            done();
          });
      });

      it('should get a 200 response from the users/1 route and the user should have an id of 1', function (done) {
        orderAgent.get('/api/users/1')
          .expect(200)
          .end(function (err, response) {
            if (err) return done(err);
            expect(response.body).to.be.an('object');
            expect(response.body.id).to.eql(userInfo.id);
            expect(response.body.email).to.eql(userInfo.email);
            // Shouldn't check password here because it's encrypted on the response
            // Security Schmamertiy 
            done();
          });
      });

    });
})