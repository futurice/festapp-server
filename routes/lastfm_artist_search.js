var lastfm = require('../lib/lastfm_artist_search');

module.exports = function(app, apiVersion) {
  app.get('/api' + apiVersion + '/lastfm/search/:artist?', function(req, res) {
    var artist = req.params.artist
    lastfm.search(artist, res);
  });
};
