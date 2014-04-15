module.exports = function(app, apiVersion) {
  var topArtists = require('../lib/lastfm');

  app.get('/api' + apiVersion + '/top-artists/:username', topArtists.topArtists);
}
