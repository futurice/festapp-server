var flickr = require('../lib/flickr');

module.exports = function(app, apiVersion) {
  app.use('/api' + apiVersion + '/flickr/tag', flickr.tagMedia);
  app.use('/api' + apiVersion + '/flickr/user', flickr.userMedia);
}
