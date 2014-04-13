module.exports = function(app, apiVersion) {
  var twitter = require('../lib/twitter');

  app.use('/api' + apiVersion + '/twitter/search/:search/:count?',  twitter.twitter.createHandler(twatter, 'search'));
  app.use('/api' + apiVersion + '/twitter/user/:userSearch/:count?', twitter.twitter.createHandler(twatter, 'userSearch'));
  app.use('/api' + apiVersion + '/twitter/hashtag/:hashtag/:count?', twitter.twitter.createHandler(twatter, 'hashtag'));

  var twatter = new twitter.twitter(process.env.TWITTER_API_KEY, process.env.TWITTER_SECRET);
  twatter.authenticate(function(success) {
    if (!success) {
      console.error("Authentication failed");
    }
  })
}
