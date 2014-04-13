var app = require('../server');
var request = require('supertest');


describe('POST localisation value', function(){
  it('successfully sets localisation', function(done){
    request(app)
      .post('/api/v1/localisation/')
      .set('Authorization', 'Basic YWRtaW46YWRtaW4=')
      .set('Content-Type', 'application/json')
      .send({key:'type-STAGE-String-de', val: 'BÜHNE'})
      .expect({success: 'Localisation added'})
      .expect(200)
      .end(done);
  });
});

describe('GET localised locations', function(){
  it('successfully localises locations', function(done){
    request(app)
      .get('/api/v1/locations?lang=de')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/, console.log)
      .expect(200)
      .expect(function(res) {
        var types = res.body.map(function(location) {
          return location.type;
        });
        return ~types.indexOf('BÜHNE') ? false : 'Localized string was not found';
      })
      .end(done);
  });
});
