var data = require('./data');
var flickr = require('./flickr');
var imdb = require('./imdb');
var instagram = require('./instagram');
var lastfm = require('./lastfm');
var lastfm_artist_search = require('./lastfm_artist_search');
var localisation = require('./localisation');
var rotten = require('./rotten');
var schema = require('./schema');
var star = require('./star');
var twitter = require('./twitter');
var weather = require('./weather');
var api = require('./api');

module.exports = function(app, apiVersion) {
  data(app, apiVersion);
  flickr(app, apiVersion);
  imdb(app, apiVersion);
  instagram(app, apiVersion);
  lastfm(app, apiVersion);
  lastfm_artist_search(app, apiVersion);
  localisation(app, apiVersion);
  rotten(app, apiVersion);
  schema(app, apiVersion);
  star(app, apiVersion);
  twitter(app, apiVersion);
  weather(app, apiVersion);
  api(app, apiVersion);
};
