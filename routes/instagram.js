var instagram = require('../lib/instagram');

module.exports = function(app, apiVersion) {
  app.use('/api' + apiVersion + '/instagram/tag', instagram.tagMedia);
  app.use('/api' + apiVersion + '/instagram/user', instagram.userMedia);
}
