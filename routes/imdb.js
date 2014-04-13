var imdb = require('../lib/imdb');

module.exports = function(app, apiVersion) {
  app.get('/api/' + apiVersion + '/imdb/:query', imdb.imdb);
}
