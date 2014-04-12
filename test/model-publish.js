var assert = require('assert');
var app = require('../server');
var request = require('supertest');

var Artist = require('../api/models/artist');
var Info = require('../api/models/info');
var News = require('../api/models/news');
var Event = require('../api/models/event');
var Location = require('../api/models/location');
var Festival = require('../api/models/festival');


describe('GET artist schema', function(){
  it('matches the inner schema', function(done){
    request(app)
      .get('/api/v1/schema/artist')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(function(res) {
        var foo = Artist.schema.tree;
        delete foo.id;
        delete foo._id;
        delete foo.__v;
        return Object.keys(res.body).join() !== Object.keys(foo).join();
      }).end(done);
  });
});

describe('GET festival schema', function(){
  it('matches the inner schema', function(done){
    request(app)
      .get('/api/v1/schema/festival')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(function(res) {
        var foo = Festival.schema.tree;
        delete foo.id;
        delete foo._id;
        delete foo.__v;
        return Object.keys(res.body).join() !== Object.keys(foo).join();
      }).end(done);
  });
});

describe('GET event schema', function(){
  it('matches the inner schema', function(done){
    request(app)
      .get('/api/v1/schema/event')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(function(res) {
        var foo = Event.schema.tree;
        delete foo.id;
        delete foo._id;
        delete foo.__v;
        return Object.keys(res.body).join() !== Object.keys(foo).join();
      }).end(done);
  });
});

describe('GET location schema', function(){
  it('matches the inner schema', function(done){
    request(app)
      .get('/api/v1/schema/location')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(function(res) {
        var foo = Location.schema.tree;
        delete foo.id;
        delete foo._id;
        delete foo.__v;
        return Object.keys(res.body).join() !== Object.keys(foo).join();
      }).end(done);
  });
});

describe('GET info schema', function(){
  it('matches the inner schema', function(done){
    request(app)
      .get('/api/v1/schema/info')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(function(res) {
        var foo = Info.schema.tree;
        delete foo.id;
        delete foo._id;
        delete foo.__v;
        return Object.keys(res.body).join() !== Object.keys(foo).join();
      }).end(done);
  });
});

describe('GET news schema', function(){
  it('matches the inner schema', function(done){
    request(app)
      .get('/api/v1/schema/news')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(function(res) {
        var foo = News.schema.tree;
        delete foo.id;
        delete foo._id;
        delete foo.__v;
        return Object.keys(res.body).join() !== Object.keys(foo).join();
      }).end(done);
  });
});
