var assert = require('assert');
var app = require('../server');
var request = require('supertest');


describe('POST localisation value', function(){
  it('successfully sets localisation', function(done){
    request(app)
      .post('/api/v1/localisation/')
      .set('Content-Type', 'application/json')
      .send({key:'type-STAGE-de', value: 'BÜHNE'})
      // .expect({success: 'Localisation added'})
      .expect(200)
      .end(done);
  });
});

describe('GET localised locations', function(){
  it('successfully localises locations', function(done){
    request(app)
      .get('/api/v1/locations?lang=de')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(function(res) {
        res.body.forEach(function(location) {
          if (location.type === 'BÜHNE') {
            return false;
          }
        });
        return 'Localized string was not found';
      })
      .end(done);
  });
});
