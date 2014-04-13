var data = require('./data') 
  , flickr = require('./flickr')
  , imdb = require('./imdb')
  , instagram = require('./instagram')
  , localisation = require('./localisation')
  , rotten = require('./rotten')
  , schema = require('./schema')
  , star = require('./star')
  , twitter = require('./twitter')
  , weather = require('./weather')
;

module.exports = function(app, apiVersion) {
  data(app, apiVersion);
  flickr(app, apiVersion);
  imdb(app, apiVersion);
  instagram(app, apiVersion);
  localisation(app, apiVersion);
  rotten(app, apiVersion);
  schema(app, apiVersion);
  star(app, apiVersion);
  twitter(app, apiVersion);
  weather(app, apiVersion);
}
