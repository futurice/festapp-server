var assert = require('assert');
var app = require('../server');
var request = require('supertest');


describe('POST localisation value', function(){
  it('succussfully sets localisation', function(done){
    request(app)
      .post('/api/v1/localisation/')
      .set('Content-Type', 'application/json')
      .send({key:'type-STAGE-de', value: 'BÜHNE'})
      // .expect({success: 'Localisation added'})
      .expect(200)
      .end(done);
  });
});
