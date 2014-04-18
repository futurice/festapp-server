var async = require('async');
var request = require('request');
var _ = require('lodash');
var LastFmNode = require('lastfm').LastFmNode;

var lastfm = new LastFmNode({
  api_key: process.env.LASTFM_KEY,
  secret: process.env.LASTFM_SECRET
});

//Initialize the values of the model to empty strings and arrays.
function initModel() {
  return {
    'name': '',
    'picture': '',
    'quote': '',
    'content': '',
    'featured': '',
    'status': '',
    'founded': '',
    'genres': [],
    'members': [],
    'albums': [],
    'highlights': [],
    'youtube': '',
    'spotify': '',
    'contact_info': '',
    'press_image': '',
    'credits': '',
    'place': ''
  };
}

function bind(lastfmData, spotifyData) {
  var model;
  var genres = [];
  model = initModel();

  if (lastfmData.artist) {
    model.name = lastfmData.artist.name;
    model.picture = lastfmData.artist.image[4]['#text'];
    model.content = removeLinksFromString(lastfmData.artist.bio.summary);
    // here we parse genres so we only get names.
    // if genrelist is empty do nothing to skip errors

    var emptyGenres = lastfmData.artist.tags.tag === undefined;
    if (!emptyGenres) {
      genres = _.map(lastfmData.artist.tags.tag, function(tag) {
        return tag.name;
      });
    }
  }

  model.genres = genres;
  model.spotify = spotifyData.spotifyUri || '';
  model.albums = spotifyData.albums || {};

  return model;
}

function removeLinksFromString(string){

  //First: remove all parts that are in HTML <a> tags.
  var temp = string;
  var startIndex = -1;
  var endIndex = -1;
  var substr;
  while (temp.indexOf('<a') > -1){
    startIndex = temp.indexOf('<a');
    substr = temp.substring(startIndex);
    //we add the length of "a>" and ending dot from lastfm.
    endIndex = substr.indexOf('a>') +2;
    if (endIndex > -1){
      temp = temp.substring(0,startIndex) + substr.substring(endIndex);
    } else {
      temp = temp.substring(0,startIndex);
    }
  }

  //Remove empty parenthesis from the string
  temp = temp.replace(/\(\s*\)/g,'');
  temp = temp.replace(/\s(\.)/g, '.');

  //Second: Remove all line-breaks.

  temp = temp.replace(/\t|\r?\n|\r/g,' ');

  //2.5: Remove lastfm's ending dot.

  temp = temp.trim();
  temp = temp.substring(0,temp.length-1);

  //Third: Remove extra whitespace from start and beginning.

  temp = temp.trim();
  return temp;
}


// flow: search lastfm api -> get spotify uri/albums -> bind model
function search(artist, res) {
  var model = initModel();
  var lastfmData = {};
  var spotifyData = {};

  async.series([
    function(callback) {
      var processResponse = function(data) {
        lastfmData = data;
      };
      queryLastfm(artist, processResponse, callback);
    },

    function(callback) {
      var processResponse = function(data) {
        spotifyData = data;
      };
      
      if (lastfmData.artist) {
        querySpotify(lastfmData.artist.name, processResponse, callback);
      } else {
        callback('No artist');
      }
    },

    function(callback) {
      model = bind(lastfmData, spotifyData);
      callback();
    }
  ],
  function(err) {
    res.type('application/json; charset=utf-8');
    res.json(model);
    res.end();
  });
}

function queryLastfm(artist, processResponse, done) {
  lastfm.request('artist.getInfo', {
    artist: artist, 
    handlers: {
      success: function(data) {
        processResponse(data);
        done();
      },
      error: function(error) {
        done('Lastfm artist search error: ' + error.message);
      }
    }
  });
}

function querySpotify(artist, processResponse, done) {
  request('http://ws.spotify.com/search/1/artist.json?q=artist:'+artist,
    function (error, response, body) {

      // if Spotify api can't find match - this happens often, as lastfm is more expansive
      var parsedBody = JSON.parse(body);
      if (parsedBody.info && parsedBody.info.num_results === 0) {
        processResponse({});
        done();
      } else if (!error && response.statusCode === 200 &&
                 parsedBody.artists && parsedBody.artists.length > 0) {
        var uri = parsedBody.artists[0].href;
        request('http://ws.spotify.com/lookup/1/.json?uri='+uri,
          function (error2, response2, body2) {
            if(!artist === JSON.parse(body2).artist.name) {
              processResponse({'spotifyUri': uri});
              done();
            }

            if (!error2 && response2.statusCode === 200) {
              request('http://ws.spotify.com/lookup/1/.json?uri=' + uri + '&extras=album',
                function (error3, response3, body3) {
                  parsedBody = JSON.parse(body3);
                  var spotifyArtist = parsedBody.artist || {};
                  var albumsinfo = spotifyArtist.albums || [];
                  var albums = _.map(albumsinfo, function(a) {
                    return a.album.name;
                  });

                  processResponse({'albums': albums, 'spotifyUri': uri});
                  done();
                }
              );
            }
          }
        );
      } else {
       done('Spotify download failed');
      }
    }
  );
}

// exposed methods
module.exports = {
  search: function (artist, res) {
    return search(artist, res);
  }
};
