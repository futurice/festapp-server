var rotten = require('../lib/rotten');

module.exports = function(app, apiVersion) {
  app.get('/api' + apiVersion + '/rotten/:query', rotten.rotten);
}
