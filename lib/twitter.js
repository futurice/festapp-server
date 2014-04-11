var request = require('request');
var cache = require('memory-cache');

var Twitter = function (key, secret) {
  this.key = key;
  this.secret = secret;
  this.user_agent = 'festival-app';
  this.access_token = null;
}

Twitter.prototype.isAuthenticated = function() {
  return (this.access_token !== null);
}

Twitter.prototype.authenticate = function (callback) {

  var auth_token = new Buffer(encodeURI(this.key) + ':' + encodeURI(this.secret)).toString('base64');


  var options = {
    url: 'https://api.twitter.com/oauth2/token',
    method: 'POST',
    body: 'grant_type=client_credentials',
    headers: {
      'Authorization': 'Basic ' + auth_token,
      'User-Agent': this.user_agent,
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
  };

  var that = this;

  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var info = JSON.parse(body);
      that.access_token = info.access_token;
      callback(true);
    } else {
      console.error(error);
      callback(false);
    }
  });
};

Twitter.createHandler = function(handler, fun) {
  return function(req,res) {
    if (!handler.isAuthenticated()) {
      console.log(handler);
      res.send(500);
    } else {
      var callback = function(statuses) {
        res.type('application/json; charset=utf-8').end(JSON.stringify(statuses));
      }
      handler[fun](req.param(fun), callback, req.param('count'));
    }
  }
}

Twitter.prototype.userSearch = function(username, callback, count) {
  this.search("from:"+username, callback, count);
}
Twitter.prototype.hashtag = function(hashtag, callback, count) {
  this.search(encodeURIComponent("#"+hashtag), callback, count);
}

Twitter.prototype.search = function (search_term, callback, count) {

  var cacheKey = search_term + count;
  var cachedResult = cache.get(cacheKey);

  if (cachedResult) {
    console.log("Cache hit!");
    callback(cachedResult);
  } else {
    console.log("Cache miss!");
    count = count || 50;

    var search_opts = {
      url: 'https://api.twitter.com/1.1/search/tweets.json',
      method: 'GET',
      qs: {
        q: search_term,
        result_type: 'recent',
        count: count
      },
      headers: {
        Authorization: 'Bearer ' + this.access_token,
        'User-Agent': this.user_agent
      }
    };


    request(search_opts, function (error, response, body) {
      var statuses = [];
      if (!error && response.statusCode == 200) {
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
          })
        }
      } else {
        console.error(error);
      }
      cache.put(cacheKey, statuses, 5 * 60 * 1000);
      callback(statuses);
    })
  }
}

module.exports = {
  twitter: Twitter
}