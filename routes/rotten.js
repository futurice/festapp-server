var rotten = require('../lib/rotten');

module.exports = function(app) {
  app.get('/api/rotten/:query', rotten.rotten);
  app.get('/api/imdb/:query', imdb.imdb);
}
