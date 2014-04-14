module.exports = function(app, apiVersion) {
  var topArtists = require('../lib/lastfm');

  app.use('/api' + apiVersion + '/top-artists/:username', topArtists.topArtists);
}
