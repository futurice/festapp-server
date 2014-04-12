var assert = require('assert');
var app = require('../server');
var request = require('supertest');

describe('GET artists', function(){
  it('does stuff', function(done){
    request(app)
      .get('/api/v1/artists')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  })
});
