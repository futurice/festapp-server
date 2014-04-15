var instagram = require('../lib/instagram');

module.exports = function(app, apiVersion) {
  app.get('/api' + apiVersion + '/instagram/tag', instagram.tagMedia);
  app.get('/api' + apiVersion + '/instagram/user', instagram.userMedia);
}
