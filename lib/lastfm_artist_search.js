var async = require('async');
var request = require('request');
var _ = require('lodash');
var LastFmNode = require('lastfm').LastFmNode;

var lastfm = new LastFmNode({
  api_key: process.env.LASTFM_KEY,
  secret: process.env.LASTFM_SECRET
});

//Initialize the values of the model to empty strings and arrays.
function init_model() {
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

function bind(lastfm_data, spotify_data) {
  var model;
  var genres = [];
  model = init_model();

  if (lastfm_data.artist) {
    model.name = lastfm_data.artist.name;
    model.picture = lastfm_data.artist.image[4]['#text'];
    model.content = remove_links_from_string(lastfm_data.artist.bio.summary);
    // here we parse genres so we only get names.
    // if genrelist is empty do nothing to skip errors

    var empty_genres = lastfm_data.artist.tags.tag==undefined;
    if (!empty_genres) {
      genres = _.map(lastfm_data.artist.tags.tag, function(tag) {
        return tag.name;
      });
    }
  }

  model.genres = genres;
  model.spotify = spotify_data.spotify_uri || '';
  model.albums = spotify_data.albums || {};

  return model;
}

function remove_links_from_string(string){

  //First: remove all parts that are in HTML <a> tags.
  var temp = string;
  var start_index = -1;
  var end_index = -1;
  var substr;
  while (temp.indexOf('<a') > -1){
    start_index = temp.indexOf('<a');
    substr = temp.substring(start_index);
    //we add the length of "a>" and ending dot from lastfm.
    end_index = substr.indexOf('a>') +2;
    if (end_index > -1){
      temp = temp.substring(0,start_index) + substr.substring(end_index);
    } else {
      temp = temp.substring(0,start_index);
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
  var model = init_model();
  var lastfm_data = {};
  var spotify_data = {};

  async.series([
    function(callback) {
      var process_response = function(data) {
        lastfm_data = data;
      }
      query_lastfm(artist, process_response, callback);
    },

    function(callback) {
      var process_response = function(data) {
        spotify_data = data;
      }
      
      if (lastfm_data.artist) {
        query_spotify(lastfm_data.artist.name, process_response, callback);
      } else {
        callback('No artist');
      }
    },

    function(callback) {
      model = bind(lastfm_data, spotify_data);
      callback();
    }
  ],
  function(err) {
    res.type('application/json; charset=utf-8');
    res.json(model);
    res.end();
  });
};

function query_lastfm(artist, process_response, done) {
  lastfm.request("artist.getInfo", {
    artist: artist, 
    handlers: {
      success: function(data) {
        process_response(data);
        done();
      },
      error: function(error) {
        done('Lastfm artist search error: ' + error.message);
      }
    }
  });
};

function query_spotify(artist, process_response, done) {
  request('http://ws.spotify.com/search/1/artist.json?q=artist:'+artist,
    function (error, response, body) {

      // if Spotify api can't find match - this happens often, as lastfm is more expansive
      var parsed_body = JSON.parse(body);
      if (parsed_body.info && parsed_body.info.num_results == 0) {
        process_response({});
        done();
      } else if (!error && response.statusCode == 200 &&
                 parsed_body.artists && parsed_body.artists.length > 0) {
        var uri = parsed_body.artists[0].href;
        request('http://ws.spotify.com/lookup/1/.json?uri='+uri,
          function (error, response, body) {
            if(!artist==JSON.parse(body).artist.name) {
              process_response({'spotify_uri': uri});
              done();
            }

            if (!error && response.statusCode == 200) {
              request('http://ws.spotify.com/lookup/1/.json?uri=' + uri + '&extras=album',
                function (error, response, body) {
                  parsed_body = JSON.parse(body);
                  var artist = parsed_body.artist || {};
                  var albumsinfo = artist.albums || [];
                  var albums = _.map(albumsinfo, function(a) {
                    return a.album.name;
                  });

                  process_response({'albums': albums, 'spotify_uri': uri});
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
};

// exposed methods
module.exports = {
  search: function (artist, res) {
    return search(artist, res)
  }
};
