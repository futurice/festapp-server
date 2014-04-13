var rotten = require('../lib/rotten')
  , imdb = require('../lib/imdb')
;

module.exports = function(app) {
  app.get('/api/rotten/:query', rotten.rotten);
  app.get('/api/imdb/:query', imdb.imdb);
}
