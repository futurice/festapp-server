var request = require('request');
var cache = require('memory-cache');

var Twitter = function (key, secret) {
  this.key = key;
  this.secret = secret;
  this.userAgent = 'festival-app';
  this.accessToken = null;
  this.authenticate(function(success){
  });
};

Twitter.prototype.isAuthenticated = function() {
  return (this.accessToken !== null);
};

Twitter.prototype.authenticate = function (callback) {

  var authToken = new Buffer(encodeURI(this.key) + ':' + encodeURI(this.secret)).toString('base64');

  var options = {
    url: 'https://api.twitter.com/oauth2/token',
    method: 'POST',
    body: 'grant_type=client_credentials',
    headers: {
      'Authorization': 'Basic ' + authToken,
      'User-Agent': this.userAgent,
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
  };

  var that = this;

  request(options, function (error, response, body) {
    /*jshint camelcase: false */
    if (!error && response.statusCode === 200) {
      var info = JSON.parse(body);
      that.accessToken = info.access_token;
      callback(true);
    } else {
      console.error(error);
      callback(false);
    }
  });
};

Twitter.prototype.createHandler = function(fun) {
  var that = this;
  return function(req,res) {
    if (!that.isAuthenticated()) {
      console.error('Twitter authentication failed');
      res.send(500);
    } else {
      var callback = function(statuses) {
        res.type('application/json; charset=utf-8').end(JSON.stringify(statuses));
      };
      that[fun](req.param(fun), callback, req.param('count'));
    }
  };
};

Twitter.prototype.userSearch = function(username, callback, count) {
  this.search('from:'+username, callback, count);
};
Twitter.prototype.hashtag = function(hashtag, callback, count) {
  this.search(encodeURIComponent('#'+hashtag), callback, count);
};

Twitter.prototype.search = function (searchTerm, callback, count) {
  /*jshint camelcase: false */

  var cacheKey = searchTerm + count;
  var cachedResult = cache.get(cacheKey);

  if (cachedResult) {
    callback(cachedResult);
  } else {
    count = count || 50;

    var searchOpts = {
      url: 'https://api.twitter.com/1.1/search/tweets.json',
      method: 'GET',
      qs: {
        q: searchTerm,
        result_type: 'recent',
        count: count
      },
      headers: {
        Authorization: 'Bearer ' + this.accessToken,
        'User-Agent': this.userAgent
      }
    };


    request(searchOpts, function (error, response, body) {
      var statuses = [];
      if (!error && response.statusCode === 200) {
        var tweets = JSON.parse(body);
        for (var idx in tweets.statuses) {
          var tweet = tweets.statuses[idx];
          statuses.push({
            tweet: tweet.text,
            user: {
              name: tweet.user.name,
              img: tweet.user.profile_image_url_https,
              handle: tweet.user.screen_name
            },
            created_at: tweet.created_at
          });
        }
      } else {
        console.error(error);
      }
      cache.put(cacheKey, statuses, 5 * 60 * 1000);
      callback(statuses);
    });
  }
};

module.exports = {
  twitter: new Twitter(process.env.TWITTER_API_KEY, process.env.TWITTER_SECRET)
};
