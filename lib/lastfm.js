var request = require('request');
var cache = require('memory-cache');
var async = require('async');
var CACHEKEY_PREFIX = 'lastfm-';

function makeSureWeHaveArtists(callback){
  var eventInfo = {
    url: 'http://ws.audioscrobbler.com/2.0/',
    qs: {
      method: 'event.getinfo',
      event: process.env.LASTFM_EVENT_ID,
      api_key: process.env.LASTFM_KEY,
      format: 'json'
    }
  };

  request(eventInfo, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var artists, event = JSON.parse(body);
      if (event.event && event.event.artists) {
        artists = event.event.artists.artist;
      } else {
        artists = [];
      }
      cache.put('artists', artists, 1000 * 60 * 60 * 24);
      callback();
    } else {
      console.error(error);
      callback(error);
    }
  });
}

function generateParallelArtistCalls(callback, username, funs, playcounts){
  var artists = cache.get('artists');
  artists.forEach(function(artist){
          
    funs.push(
      //artistfunction
      function (cb) {
        var opts = {
          url: 'http://ws.audioscrobbler.com/2.0/',
          qs: {
            method: 'artist.getinfo',
            artist: artist,
            api_key: process.env.LASTFM_KEY,
            format: 'json',
            username: username
          }
        };

        request(opts, function (error, response, body) {
          if (!error && response.statusCode === 200) {
            var info = JSON.parse(body);
            var playcount = parseInt(info.artist.stats.userplaycount) || 0;

            playcounts.push({ name: artist, playcount: playcount });
          } else {
            console.error(error);
          }
          cb();
        });
      }
      //artistfunction
    );
  });//foreach
  callback();
}

function userArtists(username, _callback) {
  var cachedArtists = cache.get(CACHEKEY_PREFIX + username);
  if (cachedArtists) {
    _callback(cachedArtists);
  } else {
    //fetch artists from cache
    var playcounts = [];
    var funs = [];
    var artistSuggestions = [];

    async.series(
      [
        // make sure we have artists
        function(callback){
          makeSureWeHaveArtists(callback);
        },
        
        function(callback){
          generateParallelArtistCalls(callback, username, funs, playcounts);
        },
        
        //get data of all artists
        function(callback) {
          //loopArtists(artists, username, cb, callback)
          async.parallel(funs, function() { callback(); });
        },

        //second in series: process data of all artists
        function(callback) {
          async.sortBy(playcounts, function(x, cb) {
            cb(null, -1 * x.playcount);
          }, function(err, result) {
            artistSuggestions = result;
            callback();
          });
        }
      ],

      //series done, send data to user ?
      function(err, results) {
        cache.put(CACHEKEY_PREFIX + username, artistSuggestions);
        _callback(artistSuggestions);
    });
  }
}

module.exports = {
  topArtists: function(req,res) {
    userArtists(req.param('username'), function(artists) {
      res.type('application/json; charset=utf-8').end(JSON.stringify(artists.slice(0,5)));
    });
  }
};
