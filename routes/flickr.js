var flickr = require('../lib/flickr');

module.exports = function(app, apiVersion) {
  app.get('/api' + apiVersion + '/flickr/tag', flickr.tagMedia);
  app.get('/api' + apiVersion + '/flickr/user', flickr.userMedia);
}
