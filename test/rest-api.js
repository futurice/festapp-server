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
describe('GET festival', function(){
  it('does stuff', function(done){
    request(app)
      .get('/api/v1/festival')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  })
});
describe('GET events', function(){
  it('does stuff', function(done){
    request(app)
      .get('/api/v1/events')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  })
});
describe('GET locations', function(){
  it('does stuff', function(done){
    request(app)
      .get('/api/v1/locations')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  })
});
describe('GET news', function(){
  it('does stuff', function(done){
    request(app)
      .get('/api/v1/news')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  })
});
describe('GET info', function(){
  it('does stuff', function(done){
    request(app)
      .get('/api/v1/info')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  })
});
