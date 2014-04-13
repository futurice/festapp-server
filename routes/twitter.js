module.exports = function(app, apiVersion) {
  var twitter = require('../lib/twitter');

  app.use('/api' + apiVersion + '/twitter/search/:search/:count?',  twitter.twitter.createHandler('search'));
  app.use('/api' + apiVersion + '/twitter/user/:userSearch/:count?', twitter.twitter.createHandler('userSearch'));
  app.use('/api' + apiVersion + '/twitter/hashtag/:hashtag/:count?', twitter.twitter.createHandler('hashtag'));
}
