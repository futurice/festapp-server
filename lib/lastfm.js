var request = require('request')
var cache = require('memory-cache')
var async = require('async')




function userArtists(username, _callback) {
  var user_artists = cache.get(username);
  if (user_artists) {
    _callback(user_artists);
  } else {

    //fetch artists from cache
    var playcounts = {};
    var funs = [];
    var artists = cache.get('artists') || [];

    var artistSuggestions = [];
    async.series(
      [
        // make sure we have artists
        function(callback) {

          var eventInfo = {
            url: 'http://ws.audioscrobbler.com/2.0/',
            qs: {
              method: 'event.getinfo',
              event: process.env.LASTFM_EVENT_ID,
              api_key: process.env.LASTFM_KEY,
              format: 'json'
            }
          }

          console.log(eventInfo);

          request(eventInfo, function(error, response, body) {
            if (!error && response.statusCode == 200) {
              var event = JSON.parse(body);
              console.log(event);
              var artists = event.event.artists.artist || [];
              cache.put('artists', artists);
              callback();
            } else {
              console.error(error);
              callback(error);
            }
          });
        },

        function(callback) {
          var artists = cache.get('artists');
          for (var i in artists) {
            var artist = artists[i];
            var opts = {
              url: 'http://ws.audioscrobbler.com/2.0/',
              qs: {
                method: 'artist.getinfo',
                artist: artist,
                api_key: process.env.LASTFM_KEY,
                format: 'json',
                username: username
              }
            }

            funs.push(function (cb) {
              console.log("artist ..");
              request(opts, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                  var info = JSON.parse(body);
                  console.log(info);
                  var playcount = info.artist.stats.userplaycount || 0;
                  playcounts[artist] = playcount;
                } else {
                  console.error(error);
                }
                cb();

              });
            });
          }
          callback();

        },
        //first in series: get data of all artists
        function(callback) {
          console.log("Fetching artists")
          //loopArtists(artists, username, cb, callback)
          async.parallel(funs);
          console.log("Fetching artists done")

          callback();
        },

        //second in series: process data of all artists
        function(callback) {
          console.log("Starting to process playcounts")
          for (var plays in playcounts) {
            console.log(plays);
          }
          console.log(playcounts);
          console.log("Playcounts done.")
          callback();
        }
      ],

      //series done, send data to user ?
      function(err, results) {
        console.log("Finally returning suggestions");
        _callback(artistSuggestions);
    });
  }
}


module.exports = {
  topArtists: function(req,res) {
    userArtists(req.param('username'), function(artists) {
      res.type('application/json; charset=utf-8').end(JSON.stringify(artists));
    });
  }
}
