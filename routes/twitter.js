module.exports = function(app, apiVersion) {
  var twitter = require('../lib/twitter');

  app.get('/api' + apiVersion + '/twitter/search/:search/:count?',  twitter.twitter.createHandler('search'));
  app.get('/api' + apiVersion + '/twitter/user/:userSearch/:count?', twitter.twitter.createHandler('userSearch'));
  app.get('/api' + apiVersion + '/twitter/hashtag/:hashtag/:count?', twitter.twitter.createHandler('hashtag'));
};
